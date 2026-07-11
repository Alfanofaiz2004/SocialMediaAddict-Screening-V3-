const fs = require('fs');
const path = require('path');

const profilePath = path.join(__dirname, 'src/app/screening/profile/page.tsx');
let profileContent = fs.readFileSync(profilePath, 'utf8');

const adminPath = path.join(__dirname, 'src/app/screening/admin/page.tsx');
const adminContent = fs.readFileSync(adminPath, 'utf8');

// 1. Add imports
const importsToAdd = `import { ZONES, SVAS_QUESTIONS, SVAS_OPTIONS } from '@/lib/screening-constants';
import { ZoneType } from '@/lib/screening-types';
import { CriteriaBarChart, PlatformBarChart, SVASRadarChart } from '@/components/ResultVisualizations';
import { motion, AnimatePresence } from 'framer-motion';
`;

profileContent = profileContent.replace(
  "import ScreeningHeader from '@/components/ScreeningHeader';",
  "import ScreeningHeader from '@/components/ScreeningHeader';\n" + importsToAdd
);

// 2. Add viewModal state
profileContent = profileContent.replace(
  "const [history, setHistory] = useState<any[]>([]);",
  "const [history, setHistory] = useState<any[]>([]);\n  const [viewModal, setViewModal] = useState<any>(null);"
);

// 3. Map history data
const oldFetch = `      fetch(\`/api/results?username=\${encodeURIComponent(username)}\`)
        .then(res => res.json())
        .then(data => {
          if (data.success) setHistory(data.data);
        });`;
const newFetch = `      fetch(\`/api/results?username=\${encodeURIComponent(username)}\`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            const mappedHistory = data.data.map((r: any) => ({
              id: r.id,
              createdAt: r.date,
              userName: r.username,
              input: r.rawInput,
              result: r.rawResult
            }));
            setHistory(mappedHistory);
          }
        });`;
profileContent = profileContent.replace(oldFetch, newFetch);

// 4. Extract viewModal JSX from adminContent
const viewModalStart = adminContent.indexOf("{/* View Modal */}");
const viewModalEnd = adminContent.indexOf("      </AnimatePresence>\r\n\r\n    </div>") !== -1 
  ? adminContent.indexOf("      </AnimatePresence>\r\n\r\n    </div>") + 24
  : adminContent.indexOf("      </AnimatePresence>\n\n    </div>") + 24;

let viewModalJSX = adminContent.substring(viewModalStart, viewModalEnd);

// Fallback if indexOf fails due to line endings
if (viewModalStart === -1 || viewModalJSX.length < 100) {
    const lines = adminContent.split('\\n');
    let startIndex = -1, endIndex = -1;
    for (let i=0; i<lines.length; i++) {
        if (lines[i].includes('{/* View Modal */}')) startIndex = i;
        // Looking for the closing of AnimatePresence for the view modal
        if (startIndex !== -1 && lines[i].includes('</AnimatePresence>') && i > startIndex + 10) {
            endIndex = i;
            break;
        }
    }
    viewModalJSX = lines.slice(startIndex, endIndex + 1).join('\\n');
}

// 5. Replace table rendering
const oldTableStart = profileContent.indexOf('<div className="overflow-x-auto">');
const oldTableEnd = profileContent.indexOf('</div>\r\n          ) : (\r\n            <div className="text-center py-8 text-on-surface-variant">') !== -1
  ? profileContent.indexOf('</div>\r\n          ) : (\r\n            <div className="text-center py-8 text-on-surface-variant">') + 6
  : profileContent.indexOf('</div>\n          ) : (\n            <div className="text-center py-8 text-on-surface-variant">') + 6;

// Extract admin table
const adminTableStart = adminContent.indexOf('<table className="w-full text-left border-collapse">');
const adminTableEnd = adminContent.indexOf('</table>\r\n        </div>\r\n        </>\r\n        )}') !== -1
  ? adminContent.indexOf('</table>\r\n        </div>\r\n        </>\r\n        )}') + 8
  : adminContent.indexOf('</table>\n        </div>\n        </>\n        )}') + 8;

let adminTableJSX = adminContent.substring(adminTableStart, adminTableEnd);
// Fix variable name (paginatedResults -> history)
adminTableJSX = adminTableJSX.replace(/paginatedResults/g, "history");
// Remove Edit and Delete buttons from admin table JSX
adminTableJSX = adminTableJSX.replace(/<button onClick=\{\(\) => \{ setEditModal\(r\); setEditName\(r\.userName\); \}\} className="text-primary hover:text-primary-container" title="Edit Name">\s*<span className="material-symbols-outlined text-\[20px\]">edit<\/span>\s*<\/button>/g, "");
adminTableJSX = adminTableJSX.replace(/<button onClick=\{\(\) => handleDelete\(r\.id\)\} className="text-error hover:text-on-error-container" title="Delete Record">\s*<span className="material-symbols-outlined text-\[20px\]">delete<\/span>\s*<\/button>/g, "");


profileContent = profileContent.substring(0, oldTableStart) + 
                 '<div className="overflow-x-auto">\n              ' + adminTableJSX + '\n            </div>' + 
                 profileContent.substring(oldTableEnd);


// Remove exportResult function which is no longer needed
profileContent = profileContent.replace(/  const exportResult = \(result: AssessmentResult\) => {[\s\S]*?};\n/g, "");

// Add ViewModal at the end before closing div
profileContent = profileContent.substring(0, profileContent.lastIndexOf("</div>")) + "\n" + viewModalJSX + "\n</div>";

fs.writeFileSync(profilePath, profileContent, 'utf8');
console.log("Updated profile/page.tsx");
