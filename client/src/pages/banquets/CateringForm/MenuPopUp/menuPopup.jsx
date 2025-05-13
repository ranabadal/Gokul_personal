
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

  const getOptionLabel = (opt) => (typeof opt === "object" && opt !== null ? opt.name : opt);

  useEffect(() => {
    async function fetchMenu() {
      try {
        const url = `${BASE_URL}/api/menus?name=${encodeURIComponent(
          selectedCart
        )}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch menu data");
        }
        const data = await response.json();
        const record = data && data.length > 0 ? data[0] : null;
        setMenuRecord(record);

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
  }, [selectedCart]);

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

  const handleRadioChange = (sectionKey, event) => {
    setUserSelections((prev) => ({ ...prev, [sectionKey]: event.target.value }));
  };

  const handleDropdownChange = (sectionKey, event) => {
    setUserSelections((prev) => ({ ...prev, [sectionKey]: event.target.value }));
  };

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

  const handleSaveClick = () => {
    console.log("User selections:", userSelections);
    setMenuPreferences(userSelections);
    setIsMenuCustomized(true);
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
            <>
              {/* Render PDF if available */}
              {menuRecord.menuPdf ? (
                <div className={styles.pdfContainer}>
                  <embed
                    src={`data:application/pdf;base64,${menuRecord.menuPdf}`}
                    width="100%"
                    height="500px"
                    type="application/pdf"
                    onError={(e) => {
                      console.error("PDF could not be loaded", e);
                      // Fallback or error handling here
                    }}
                  />
                   <p>Your browser does not support PDFs. Please download the PDF to view it: 
        <a href={`data:application/pdf;base64,${menuRecord.menuPdf}`} download="menu.pdf">Download PDF</a>
      </p>
                </div>
              ) : (
                <div>No PDF available for this menu.</div>
              )}

              {/* Render sections */}
              {menuRecord.sections.map((section, index) => (
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
              ))}
            </>
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
