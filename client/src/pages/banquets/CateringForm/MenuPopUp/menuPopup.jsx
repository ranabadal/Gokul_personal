
// import React, { useState, useEffect } from "react";
// import styles from "./menuPopup.module.css";
// import { BASE_URL } from "../../../../Const/Const";
// export default function Popup({
//   menuPreferences = {},
//   selectedCart,
//   onClose,
//   onSave,
//   setMenuPreferences,
//   setIsMenuCustomized,
// }) {
//   const [userSelections, setUserSelections] = useState(menuPreferences);
//   const [menuRecord, setMenuRecord] = useState(null);

//   const getOptionLabel = (opt) => (typeof opt === "object" && opt !== null ? opt.name : opt);

//   useEffect(() => {
//     async function fetchMenu() {
//       try {
//         const url = `${BASE_URL}/api/menus?name=${encodeURIComponent(
//           selectedCart
//         )}`;
//         const response = await fetch(url);
//         if (!response.ok) {
//           throw new Error("Failed to fetch menu data");
//         }
//         const data = await response.json();
//         const record = data && data.length > 0 ? data[0] : null;
//         setMenuRecord(record);

//         if (record && Array.isArray(record.sections) && Object.keys(userSelections).length === 0) {
//           const initSelections = {};
//           record.sections.forEach((section) => {
//             const key = section._id || section.title;
//             if (section.type === "checkbox") {
//               initSelections[key] = [];
//             } else if (["radio", "dropdown"].includes(section.type)) {
//               initSelections[key] = "";
//             } else {
//               initSelections[key] = null;
//             }
//             if (section.subSections && section.subSections.length > 0) {
//               section.subSections.forEach((sub) => {
//                 const subKey = sub._id || sub.title;
//                 if (sub.type === "checkbox") {
//                   initSelections[subKey] = [];
//                 } else if (["radio", "dropdown"].includes(sub.type)) {
//                   initSelections[subKey] = "";
//                 } else {
//                   initSelections[subKey] = null;
//                 }
//               });
//             }
//           });
//           setUserSelections(initSelections);
//         }
//       } catch (error) {
//         console.error("Popup: Error fetching menu:", error);
//         setMenuRecord(null);
//       }
//     }

//     if (selectedCart) {
//       fetchMenu();
//     }
//   }, [selectedCart]);

//   const handleCheckboxChange = (sectionKey, event, limit = Infinity) => {
//     const value = event.target.value;
//     setUserSelections((prev) => {
//       const current = prev[sectionKey] || [];
//       if (current.includes(value)) {
//         return { ...prev, [sectionKey]: current.filter((item) => item !== value) };
//       } else if (current.length < limit) {
//         return { ...prev, [sectionKey]: [...current, value] };
//       }
//       return prev;
//     });
//   };

//   const handleRadioChange = (sectionKey, event) => {
//     setUserSelections((prev) => ({ ...prev, [sectionKey]: event.target.value }));
//   };

//   const handleDropdownChange = (sectionKey, event) => {
//     setUserSelections((prev) => ({ ...prev, [sectionKey]: event.target.value }));
//   };

//   const renderSection = (section) => {
//     const key = section._id || section.title;
//     switch (section.type) {
//       case "heading":
//       case "subheading":
//         return <div className={styles.textBlock}>{section.title}</div>;
//       case "checkbox":
//         return (
//           <div className={styles.inputContainer}>
//             {section.options.map((opt, idx) => {
//               const label = getOptionLabel(opt);
//               return (
//                 <label key={idx} className={styles.inputLabel}>
//                   <input
//                     type="checkbox"
//                     value={label}
//                     checked={(userSelections[key] || []).includes(label)}
//                     onChange={(e) => handleCheckboxChange(key, e, section.limit || Infinity)}
//                     className={styles.inputControl}
//                   />
//                   <span>{label}</span>
//                 </label>
//               );
//             })}
//           </div>
//         );
//       case "radio":
//         return (
//           <div className={styles.inputContainer}>
//             {section.options.map((opt, idx) => {
//               const label = getOptionLabel(opt);
//               return (
//                 <label key={idx} className={styles.inputLabel}>
//                   <input
//                     type="radio"
//                     name={key}
//                     value={label}
//                     checked={userSelections[key] === label}
//                     onChange={(e) => handleRadioChange(key, e)}
//                     className={styles.inputControl}
//                   />
//                   <span>{label}</span>
//                 </label>
//               );
//             })}
//           </div>
//         );
//       case "dropdown":
//         return (
//           <div className={styles.dropdownContainer}>
//             <select
//               className={styles.dropdown}
//               value={userSelections[key] || ""}
//               onChange={(e) => handleDropdownChange(key, e)}
//             >
//               <option value="">Select an option</option>
//               {section.options.map((opt, idx) => {
//                 const label = getOptionLabel(opt);
//                 return (
//                   <option key={idx} value={label}>
//                     {label}
//                   </option>
//                 );
//               })}
//             </select>
//           </div>
//         );
//       default:
//         return <div className={styles.textBlock}>Unsupported field type</div>;
//     }
//   };

//   const handleSaveClick = () => {
//     console.log("User selections:", userSelections);
//     setMenuPreferences(userSelections);
//     setIsMenuCustomized(true);
//     if (onSave) {
//       console.log("Notifying parent that menu is customized.");
//       onSave(true); // Mark customization as completed
//     }
//     onClose();
//   };

//   return (
//     <div className={styles.popupOverlay}>
//       <div className={styles.popup}>
//         <div className={styles.popupHeader}>
//           <h2 className={styles.popupTitle}>
//             {selectedCart || "Menu"} Customizations
//           </h2>
//           <button className={styles.popupClose} onClick={onClose}>
//             ✖
//           </button>
//         </div>
//         <div className={styles.popupBody}>
//           {menuRecord ? (
//             <>
//               {/* Render PDF if available */}
//               {menuRecord.menuPdf ? (
//                 <div className={styles.pdfContainer}>
//                   <embed
//                     src={`data:application/pdf;base64,${menuRecord.menuPdf}`}
//                     width="100%"
//                     height="500px"
//                     type="application/pdf"
//                     onError={(e) => {
//                       console.error("PDF could not be loaded", e);
//                       // Fallback or error handling here
//                     }}
//                   />
//                    <p>Your browser does not support PDFs. Please download the PDF to view it: 
//         <a href={`data:application/pdf;base64,${menuRecord.menuPdf}`} download="menu.pdf">Download PDF</a>
//       </p>
//                 </div>
//               ) : (
//                 <div>No PDF available for this menu.</div>
//               )}

//               {/* Render sections */}
//               {menuRecord.sections.map((section, index) => (
//                 <div key={index} className={styles.sectionWrapper}>
//                   <h3 className={styles.sectionTitle}>{section.title}</h3>
//                   {renderSection(section)}
//                   {section.subSections &&
//                     section.subSections.map((subSection, idx) => (
//                       <div key={idx} className={styles.subSectionContainer}>
//                         <h4 className={styles.subSectionTitle}>
//                           {subSection.title}
//                         </h4>
//                         {renderSection(subSection)}
//                       </div>
//                     ))}
//                 </div>
//               ))}
//             </>
//           ) : (
//             <div>Loading menu details...</div>
//           )}
//         </div>
//         <div className={styles.popupFooter}>
//           <button className={styles.saveButton} onClick={handleSaveClick}>
//             Save
//           </button>
//           <button className={styles.cancelButton} onClick={onClose}>
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }






import React, { useState, useEffect } from "react";
import styles from "./menuPopup.module.css";
import { BASE_URL } from "../../../../Const/Const";

export default function Popup({
  menuPreferences = {},
  selectedCart,
  onClose,
  onSave,
  setMenuPreferences,
  setIsMenuCustomized,
}) {
  const [userSelections, setUserSelections] = useState(menuPreferences);
  const [menuRecord, setMenuRecord] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);

  // Helper to pull label text
  const getOptionLabel = (opt) =>
    typeof opt === "object" && opt !== null ? opt.name : opt;

  // Fetch menu whenever cart changes
  useEffect(() => {
    if (!selectedCart) return;

    async function fetchMenu() {
      try {
        const url = `${BASE_URL}/api/menus?name=${encodeURIComponent(
          selectedCart
        )}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch menu data");
        const data = await res.json();
        const record = Array.isArray(data) && data.length > 0 ? data[0] : null;
        setMenuRecord(record);

        // Initialize selections if none exist
        if (
          record &&
          Array.isArray(record.sections) &&
          Object.keys(menuPreferences).length === 0
        ) {
          const init = {};
          record.sections.forEach((section) => {
            const key = section._id || section.title;
            if (section.type === "checkbox") init[key] = [];
            else if (["radio", "dropdown"].includes(section.type)) init[key] = "";
            else init[key] = null;

            if (Array.isArray(section.subSections)) {
              section.subSections.forEach((sub) => {
                const subKey = sub._id || sub.title;
                if (sub.type === "checkbox") init[subKey] = [];
                else if (["radio", "dropdown"].includes(sub.type)) init[subKey] = "";
                else init[subKey] = null;
              });
            }
          });
          setUserSelections(init);
        }
      } catch (err) {
        console.error("Popup: Error fetching menu:", err);
        setMenuRecord(null);
      }
    }

    fetchMenu();
  }, [selectedCart, menuPreferences]);

  // Generate a Blob URL for the PDF whenever the base64 string changes
  useEffect(() => {
    if (!menuRecord?.menuPdf) {
      setPdfUrl(null);
      return;
    }

    try {
      const binary = atob(menuRecord.menuPdf);
      const arr = Uint8Array.from(binary, (c) => c.charCodeAt(0));
      const blob = new Blob([arr], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    } catch (err) {
      console.error("Failed to create PDF blob URL:", err);
      setPdfUrl(null);
    }
  }, [menuRecord]);

  // Handlers for inputs
  const handleCheckboxChange = (key, e, limit = Infinity) => {
    const val = e.target.value;
    setUserSelections((prev) => {
      const current = prev[key] || [];
      if (current.includes(val)) {
        return { ...prev, [key]: current.filter((x) => x !== val) };
      }
      if (current.length < limit) {
        return { ...prev, [key]: [...current, val] };
      }
      return prev;
    });
  };

  const handleRadioChange = (key, e) =>
    setUserSelections((prev) => ({ ...prev, [key]: e.target.value }));

  const handleDropdownChange = (key, e) =>
    setUserSelections((prev) => ({ ...prev, [key]: e.target.value }));

  // Renders each section (and sub-section) based on its type
  const renderSection = (section) => {
    const key = section._id || section.title;
    switch (section.type) {
      case "heading":
      case "subheading":
        return <div className={styles.textBlock}>{section.title}</div>;

      case "checkbox":
        return (
          <div className={styles.inputContainer}>
            {section.options.map((opt, idx) => {
              const label = getOptionLabel(opt);
              return (
                <label key={idx} className={styles.inputLabel}>
                  <input
                    type="checkbox"
                    value={label}
                    checked={(userSelections[key] || []).includes(label)}
                    onChange={(e) =>
                      handleCheckboxChange(key, e, section.limit || Infinity)
                    }
                    className={styles.inputControl}
                  />
                  <span>{label}</span>
                </label>
              );
            })}
          </div>
        );

      case "radio":
        return (
          <div className={styles.inputContainer}>
            {section.options.map((opt, idx) => {
              const label = getOptionLabel(opt);
              return (
                <label key={idx} className={styles.inputLabel}>
                  <input
                    type="radio"
                    name={key}
                    value={label}
                    checked={userSelections[key] === label}
                    onChange={(e) => handleRadioChange(key, e)}
                    className={styles.inputControl}
                  />
                  <span>{label}</span>
                </label>
              );
            })}
          </div>
        );

      case "dropdown":
        return (
          <div className={styles.dropdownContainer}>
            <select
              className={styles.dropdown}
              value={userSelections[key] || ""}
              onChange={(e) => handleDropdownChange(key, e)}
            >
              <option value="">Select an option</option>
              {section.options.map((opt, idx) => {
                const label = getOptionLabel(opt);
                return (
                  <option key={idx} value={label}>
                    {label}
                  </option>
                );
              })}
            </select>
          </div>
        );

      default:
        return <div className={styles.textBlock}>Unsupported field type</div>;
    }
  };

  // Save & close
  const handleSaveClick = () => {
    setMenuPreferences(userSelections);
    setIsMenuCustomized(true);
    if (onSave) onSave(true);
    onClose();
  };

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popup}>
        <div className={styles.popupHeader}>
          <h2 className={styles.popupTitle}>
            {selectedCart || "Menu"} Customizations
          </h2>
          <button className={styles.popupClose} onClick={onClose}>
            ✖
          </button>
        </div>

        <div className={styles.popupBody}>
          {menuRecord ? (
            <>
              {/* PDF Viewer */}
              {pdfUrl ? (
                <iframe
                  src={pdfUrl}
                  width="100%"
                  height="500px"
                  title="Menu PDF"
                  className={styles.pdfContainer}
                />
              ) : (
                <div className={styles.pdfContainer}>
                  <p>No PDF available or failed to load.</p>
                </div>
              )}

              {/* Sections & Subsections */}
              {menuRecord.sections.map((section, i) => (
                <div key={i} className={styles.sectionWrapper}>
                  <h3 className={styles.sectionTitle}>{section.title}</h3>
                  {renderSection(section)}

                  {Array.isArray(section.subSections) &&
                    section.subSections.map((sub, j) => (
                      <div key={j} className={styles.subSectionContainer}>
                        <h4 className={styles.subSectionTitle}>
                          {sub.title}
                        </h4>
                        {renderSection(sub)}
                      </div>
                    ))}
                </div>
              ))}
            </>
          ) : (
            <div>Loading menu details…</div>
          )}
        </div>

        <div className={styles.popupFooter}>
          <button className={styles.saveButton} onClick={handleSaveClick}>
            Save
          </button>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}



