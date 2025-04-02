// import React, { useState } from "react";
// import styles from "./menuPopup.module.css";

// export default function Popup({ selectedCart, onClose }) {
//   const [welcomeDrinks, setWelcomeDrinks] = useState([]);
//   const [snacks, setSnacks] = useState([]);
//   const [paneerSnack, setPaneerSnack] = useState("");
//   const [mainCourse, setMainCourse] = useState("Main Course (Any one)");


//   const handleCheckboxChange = (event, limit, setState) => {
//     const value = event.target.value;
//     setState((prev) =>
//       prev.includes(value)
//         ? prev.filter((item) => item !== value)
//         : prev.length < limit
//         ? [...prev, value]
//         : prev
//     );
//   };

//   return (
//     <div className={styles.popupOverlay}>
//       <div className={styles.popup}>
//         <div className={styles.popupHeader}>
//           <h2 className={styles.popupTitle}>{selectedCart || "Gold"}</h2>
//           <button className={styles.popupClose} onClick={onClose}>
//             ✖
//           </button>
//         </div>
//         <div className={styles.popupBody}>
//           {/* Welcome Drink Section */}
//           <h3 className={styles.sectionTitle}>Welcome Drink (Any 2) One Time</h3>
//           <div className={styles.popupRow}>
//   <label>
//     <input
//       type="checkbox"
//       value="Soup"
//       checked={welcomeDrinks.includes("Soup")}
//       onChange={(e) => handleCheckboxChange(e, 2, setWelcomeDrinks)}
//     />
//     Soup
//   </label>
//   <label>
//     <input
//       type="checkbox"
//       value="Coldrink"
//       checked={welcomeDrinks.includes("Coldrink")}
//       onChange={(e) => handleCheckboxChange(e, 2, setWelcomeDrinks)}
//     />
//     Coldrink
//   </label>
//   <label>
//     <input
//       type="checkbox"
//       value="Lemon Soda"
//       checked={welcomeDrinks.includes("Lemon Soda")}
//       onChange={(e) => handleCheckboxChange(e, 2, setWelcomeDrinks)}
//     />
//     Lemon Soda
//   </label>
// </div>


//           {/* Snacks Section */}
//           <h3 className={styles.sectionTitle}>Snacks (Any 3)</h3>
//           <div className={styles.popupRow}>
//             <label>
//               <input
//                 type="checkbox"
//                 value="Mashroom Chilli"
//                 checked={snacks.includes("Mashroom Chilli")}
//                 onChange={(e) => handleCheckboxChange(e, 3, setSnacks)}
//               />
//               Mashroom Chilli
//             </label>
//             <label>
//               <input
//                 type="checkbox"
//                 value="Cheese Chilli"
//                 checked={snacks.includes("Cheese Chilli")}
//                 onChange={(e) => handleCheckboxChange(e, 3, setSnacks)}
//               />
//               Cheese Chilli
//             </label>
//             <label>
//               <input
//                 type="checkbox"
//                 value="Pasta"
//                 checked={snacks.includes("Pasta")}
//                 onChange={(e) => handleCheckboxChange(e, 3, setSnacks)}
//               />
//               Pasta
//             </label>
//           </div>

//           {/* Paneer Snack Section */}
//           <h3 className={styles.sectionTitle}>Snack (Paneer)</h3>
//           <div className={styles.popupRow}>
//             <label>
//               <input
//                 type="radio"
//                 value="Paneer Tikka"
//                 checked={paneerSnack === "Paneer Tikka"}
//                 onChange={(e) => setPaneerSnack(e.target.value)}
//               />
//               Paneer Tikka
//             </label>
//             <label>
//               <input
//                 type="radio"
//                 value="Paneer 65"
//                 checked={paneerSnack === "Paneer 65"}
//                 onChange={(e) => setPaneerSnack(e.target.value)}
//               />
//               Paneer 65
//             </label>
//           </div>

//           {/* Main Course Dropdown */}
//           <h3 className={styles.sectionTitle}>Main Course</h3>
//           <div>
//             <select
//               className={styles.dropdown}
//               value={mainCourse}
//               onChange={(e) => setMainCourse(e.target.value)}
//             >
//               <option>Main Course (Any one)</option>
//               <option>Butter Chicken</option>
//               <option>Paneer Butter Masala</option>
//               <option>Dal Tadka</option>
//             </select>
//           </div>
//         </div>
//         <div className={styles.popupFooter}>
//           <button className={styles.popupSave} onClick={onClose}>
//             Save
//           </button>
//           <button className={styles.popupCancel} onClick={onClose}>
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import styles from "./menuPopup.module.css";

// export default function Popup({ selectedCart, onClose, onSave }) {
//   const [menuRecord, setMenuRecord] = useState(null);
//   const [userSelections, setUserSelections] = useState({});

//   // Helper: if an option is an object with a key "name", return its name;
//   // otherwise, return the option itself
//   const getOptionLabel = (opt) =>
//     typeof opt === "object" && opt !== null ? opt.name : opt;

//   // Fetch the admin-entered menu configuration from the backend
//   useEffect(() => {
//     async function fetchMenu() {
//       try {
//         const url = `http://localhost:8080/api/menus?name=${encodeURIComponent(selectedCart)}`;
//         console.log("Popup: Fetching menu from", url);
//         const response = await fetch(url);
//         console.log("Popup: Response status:", response.status);
//         if (!response.ok) {
//           throw new Error("Failed to fetch menu data");
//         }
//         const data = await response.json();
//         console.log("Popup: Fetched data:", data);
//         const record = (data && data.length > 0) ? data[0] : null;
//         setMenuRecord(record);
//         // Initialize userSelections based on each section's type:
//         if (record && Array.isArray(record.sections)) {
//           const initSelections = {};
//           record.sections.forEach((section) => {
//             // Use _id if provided; otherwise, fallback to section title
//             const key = section._id || section.title;
//             if (section.type === "checkbox") {
//               initSelections[key] = [];
//             } else if (section.type === "radio" || section.type === "dropdown") {
//               initSelections[key] = "";
//             } else {
//               // For headings or other static text, we don't need interactive input.
//               initSelections[key] = null;
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

//   // Handler for checkbox changes: enforce the selection limit if provided.
//   const handleCheckboxChange = (sectionKey, event, limit) => {
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

//   // Handler for radio changes.
//   const handleRadioChange = (sectionKey, event) => {
//     setUserSelections((prev) => ({ ...prev, [sectionKey]: event.target.value }));
//   };

//   // Handler for dropdown changes.
//   const handleDropdownChange = (sectionKey, event) => {
//     setUserSelections((prev) => ({ ...prev, [sectionKey]: event.target.value }));
//   };

//   // Generic renderer for a section based on its type
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
//                     onChange={(e) =>
//                       handleCheckboxChange(key, e, section.limit || 1)
//                     }
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

//   // When Save is clicked, if an onSave callback is passed, return userSelections.
//   const handleSaveClick = () => {
//     console.log("User selections:", userSelections);
//     if (onSave) {
//       onSave(userSelections);
//     }
//     onClose();
//   };

//   return (
//     <div className={styles.popupOverlay}>
//       <div className={styles.popup}>
//         <div className={styles.popupHeader}>
//           <h2 className={styles.popupTitle}>
//             {selectedCart || "Gold"} Menu Customizations
//           </h2>
//           <button className={styles.popupClose} onClick={onClose}>
//             ✖
//           </button>
//         </div>
//         <div className={styles.popupBody}>
//           {menuRecord ? (
//             menuRecord.sections.map((section, index) => (
//               <div key={index} className={styles.sectionWrapper}>
//                 <h3 className={styles.sectionTitle}>{section.title}</h3>
//                 {renderSection(section)}
//               </div>
//             ))
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



// import React, { useState, useEffect } from "react";
// import styles from "./menuPopup.module.css";

// export default function Popup({menuPreferences={}, selectedCart, onClose, onSave, setMenuPreferences }) {
//   const [menuRecord, setMenuRecord] = useState(null); // Data fetched from backend
//   const [userSelections, setUserSelections] = useState(menuPreferences); // User menu preferences

//   // Helper: Retrieve option label based on type
//   const getOptionLabel = (opt) =>
//     typeof opt === "object" && opt !== null ? opt.name : opt;

//   // Fetch menu configuration from backend based on selectedCart
//   useEffect(() => {
//     async function fetchMenu() {
//       try {
//         const url = `http://localhost:8080/api/menus?name=${encodeURIComponent(
//           selectedCart
//         )}`;
//         const response = await fetch(url);
//         if (!response.ok) {
//           throw new Error("Failed to fetch menu data");
//         }
//         const data = await response.json();
//         const record = data && data.length > 0 ? data[0] : null;
//         setMenuRecord(record);

//         // Initialize userSelections based on sections and types
//         if (record && Array.isArray(record.sections)) {
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

//             // Handle sub-sections
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
//           // setUserSelections(initSelections);
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

//   // Handle checkbox selection (enforces limits if provided)
//   const handleCheckboxChange = (sectionKey, event, limit) => {
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

//   // Handle radio selection
//   const handleRadioChange = (sectionKey, event) => {
//     setUserSelections((prev) => ({ ...prev, [sectionKey]: event.target.value }));
//   };

//   // Handle dropdown selection
//   const handleDropdownChange = (sectionKey, event) => {
//     setUserSelections((prev) => ({ ...prev, [sectionKey]: event.target.value }));
//   };

//   // Render sections dynamically based on their type
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
//                     onChange={(e) => handleCheckboxChange(key, e, section.limit || 1)}
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

//   // Save preferences and close popup
//   const handleSaveClick = () => {
//     console.log("User selections:", userSelections);
//     // if (onSave) {
//       setMenuPreferences(userSelections); // Pass user selections to parent
//     // }
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
//             menuRecord.sections.map((section, index) => (
//               <div key={index} className={styles.sectionWrapper}>
//                 <h3 className={styles.sectionTitle}>{section.title}</h3>
//                 {renderSection(section)}
//                 {section.subSections &&
//                   section.subSections.map((subSection, idx) => (
//                     <div key={idx} className={styles.subSectionContainer}>
//                       <h4 className={styles.subSectionTitle}>
//                         {subSection.title}
//                       </h4>
//                       {renderSection(subSection)}
//                     </div>
//                   ))}
//               </div>
//             ))
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

export default function Popup({
  menuPreferences = {},
  selectedCart,
  onClose,
  onSave, // This callback should receive a boolean indicating customization is complete
  setMenuPreferences,
  setIsMenuCustomized,
}) {
  // Initialize local selections from parent's saved preferences
  const [userSelections, setUserSelections] = useState(menuPreferences);
  const [menuRecord, setMenuRecord] = useState(null); // Fetched menu configuration

  // Helper: Retrieve option label based on type
  const getOptionLabel = (opt) =>
    typeof opt === "object" && opt !== null ? opt.name : opt;

  // Fetch menu configuration from backend based on selectedCart.
  // Remove userSelections from dependency array so it doesn't reinitialize after editing.
  useEffect(() => {
    async function fetchMenu() {
      try {
        const url = `http://localhost:8080/api/menus?name=${encodeURIComponent(
          selectedCart
        )}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch menu data");
        }
        const data = await response.json();
        const record = data && data.length > 0 ? data[0] : null;
        setMenuRecord(record);

        // If userSelections are empty, initialize selections based on record sections
        if (record && Array.isArray(record.sections) && Object.keys(userSelections).length === 0) {
          const initSelections = {};
          record.sections.forEach((section) => {
            const key = section._id || section.title;
            if (section.type === "checkbox") {
              initSelections[key] = [];
            } else if (["radio", "dropdown"].includes(section.type)) {
              initSelections[key] = "";
            } else {
              initSelections[key] = null;
            }
            if (section.subSections && section.subSections.length > 0) {
              section.subSections.forEach((sub) => {
                const subKey = sub._id || sub.title;
                if (sub.type === "checkbox") {
                  initSelections[subKey] = [];
                } else if (["radio", "dropdown"].includes(sub.type)) {
                  initSelections[subKey] = "";
                } else {
                  initSelections[subKey] = null;
                }
              });
            }
          });
          setUserSelections(initSelections);
        }
      } catch (error) {
        console.error("Popup: Error fetching menu:", error);
        setMenuRecord(null);
      }
    }

    if (selectedCart) {
      fetchMenu();
    }
  }, [selectedCart]); // Only depends on selectedCart

  // Handle checkbox selection with optional limit
  const handleCheckboxChange = (sectionKey, event, limit = Infinity) => {
    const value = event.target.value;
    setUserSelections((prev) => {
      const current = prev[sectionKey] || [];
      if (current.includes(value)) {
        return { ...prev, [sectionKey]: current.filter((item) => item !== value) };
      } else if (current.length < limit) {
        return { ...prev, [sectionKey]: [...current, value] };
      }
      return prev;
    });
  };

  // Handle radio selection
  const handleRadioChange = (sectionKey, event) => {
    setUserSelections((prev) => ({ ...prev, [sectionKey]: event.target.value }));
  };

  // Handle dropdown selection
  const handleDropdownChange = (sectionKey, event) => {
    setUserSelections((prev) => ({ ...prev, [sectionKey]: event.target.value }));
  };

  // Render a section based on its type
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
                    onChange={(e) => handleCheckboxChange(key, e, section.limit || Infinity)}
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

  // Save preferences and notify parent
  const handleSaveClick = () => {
    console.log("User selections:", userSelections);
    setMenuPreferences(userSelections);
    setIsMenuCustomized(true)
    if (onSave) {
      console.log("Notifying parent that menu is customized.");
      onSave(true); // Mark customization as completed
    }
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
            menuRecord.sections.map((section, index) => (
              <div key={index} className={styles.sectionWrapper}>
                <h3 className={styles.sectionTitle}>{section.title}</h3>
                {renderSection(section)}
                {section.subSections &&
                  section.subSections.map((subSection, idx) => (
                    <div key={idx} className={styles.subSectionContainer}>
                      <h4 className={styles.subSectionTitle}>
                        {subSection.title}
                      </h4>
                      {renderSection(subSection)}
                    </div>
                  ))}
              </div>
            ))
          ) : (
            <div>Loading menu details...</div>
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