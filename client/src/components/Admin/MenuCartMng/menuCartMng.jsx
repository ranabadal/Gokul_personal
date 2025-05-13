


import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./menuCartMng.module.css";
import { BASE_URL } from "../../../Const/Const"; // Adjust the import path as necessary
const MenuCartManagement = () => {
  // States:
  const [menus, setMenus] = useState([]);
  const [showForm, setShowForm] = useState(false);
  
  // isEdit is true when editing an existing menu
  const [isEdit, setIsEdit] = useState(false);
  
  // currentMenu holds the active menu being created or edited.
  // Added menuPDFBase64 field for storing optional PDF as a Base64 string.
  const [currentMenu, setCurrentMenu] = useState({
    name: "",
    sections: [],
    menuPdf: ""
  });

  // Fetch menus when the component mounts.
  useEffect(() => {
    fetchMenus();
  }, []);



  const fetchMenus = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/menus`);
      if (!res.ok) throw new Error("Failed to fetch menus");
  
      const data = await res.json();
  
      // ✅ Ensure menus is always an array
      setMenus(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("❌ Error fetching menus:", error);
      setMenus([]); // ✅ Default to an empty array
    }
  };

  // ===== FORM HANDLERS =====

  // Open the form for a new menu.
  const handleAddMenu = () => {
    setShowForm(true);
    setIsEdit(false);
    setCurrentMenu({ name: "", sections: [], menuPdf: "" });
  };

  // Add a new section.
  const handleAddSection = () => {
    setCurrentMenu({
      ...currentMenu,
      sections: [
        ...currentMenu.sections,
        {
          id: uuidv4(),
          title: "",
          hasSubSections: false, // By default, use interactive fields directly.
          limit: 1,
          type: "radio",
          options: [],
          subSections: []
        }
      ]
    });
  };

  // Toggle whether a section will use sub‑sections.
  const handleToggleHasSubSections = (sectionId) => {
    const updatedSections = currentMenu.sections.map((section) =>
      section.id === sectionId
        ? { ...section, hasSubSections: !section.hasSubSections }
        : section
    );
    setCurrentMenu({ ...currentMenu, sections: updatedSections });
  };

  // Update a section field: title, limit, or type.
  const handleSectionChange = (id, key, value) => {
    const updatedSections = currentMenu.sections.map((section) => {
      if (section.id !== id) return section;
      let updatedSection = { ...section };
      if (key === "limit") {
        const newLimit = parseInt(value, 10);
        updatedSection.limit = newLimit;
        // Only if not using sub‑sections do we enforce type changes.
        if (!updatedSection.hasSubSections) {
          if (newLimit > 1) {
            updatedSection.type = "checkbox";
          } else if (updatedSection.type === "checkbox") {
            updatedSection.type = "radio";
          }
        }
      } else if (key === "type") {
        if (!updatedSection.hasSubSections) {
          updatedSection.type = updatedSection.limit > 1 ? "checkbox" : value;
        }
      } else {
        updatedSection[key] = value;
      }
      return updatedSection;
    });
    setCurrentMenu({ ...currentMenu, sections: updatedSections });
  };

  // Add an option to a section.
  const handleAddOption = (sectionId) => {
    const updatedSections = currentMenu.sections.map((section) =>
      section.id === sectionId
        ? {
            ...section,
            options: [...section.options, { id: uuidv4(), name: "" }]
          }
        : section
    );
    setCurrentMenu({ ...currentMenu, sections: updatedSections });
  };

  // Update an option’s text for a section.
  const handleOptionChange = (sectionId, optionId, value) => {
    const updatedSections = currentMenu.sections.map((section) => {
      if (section.id === sectionId) {
        return {
          ...section,
          options: section.options.map((opt) =>
            opt.id === optionId ? { ...opt, name: value } : opt
          )
        };
      }
      return section;
    });
    setCurrentMenu({ ...currentMenu, sections: updatedSections });
  };

  // Delete a section.
  const handleDeleteSection = (id) => {
    setCurrentMenu({
      ...currentMenu,
      sections: currentMenu.sections.filter((section) => section.id !== id)
    });
  };

  // ===== SUB‑SECTION HANDLERS =====

  const handleAddSubSection = (sectionId) => {
    const updatedSections = currentMenu.sections.map((section) => {
      if (section.id === sectionId) {
        const newSubSection = {
          id: uuidv4(),
          title: "",
          limit: 1,
          type: "radio",
          options: []
        };
        return { ...section, subSections: [...section.subSections, newSubSection] };
      }
      return section;
    });
    setCurrentMenu({ ...currentMenu, sections: updatedSections });
  };

  const handleSubSectionChange = (sectionId, subSectionId, key, value) => {
    const updatedSections = currentMenu.sections.map((section) => {
      if (section.id === sectionId) {
        const updatedSubSections = section.subSections.map((subSec) => {
          if (subSec.id === subSectionId) {
            let updatedSubSec = { ...subSec };
            if (key === "limit") {
              const newLimit = parseInt(value, 10);
              updatedSubSec.limit = newLimit;
              if (newLimit > 1) {
                updatedSubSec.type = "checkbox";
              } else if (updatedSubSec.type === "checkbox") {
                updatedSubSec.type = "radio";
              }
            } else {
              updatedSubSec[key] = value;
            }
            return updatedSubSec;
          }
          return subSec;
        });
        return { ...section, subSections: updatedSubSections };
      }
      return section;
    });
    setCurrentMenu({ ...currentMenu, sections: updatedSections });
  };

  const handleAddSubSectionOption = (sectionId, subSectionId) => {
    const updatedSections = currentMenu.sections.map((section) => {
      if (section.id === sectionId) {
        const updatedSubSections = section.subSections.map((subSec) => {
          if (subSec.id === subSectionId) {
            return {
              ...subSec,
              options: [...subSec.options, { id: uuidv4(), name: "" }]
            };
          }
          return subSec;
        });
        return { ...section, subSections: updatedSubSections };
      }
      return section;
    });
    setCurrentMenu({ ...currentMenu, sections: updatedSections });
  };

  const handleSubSectionOptionChange = (sectionId, subSectionId, optionId, value) => {
    const updatedSections = currentMenu.sections.map((section) => {
      if (section.id === sectionId) {
        const updatedSubSections = section.subSections.map((subSec) => {
          if (subSec.id === subSectionId) {
            return {
              ...subSec,
              options: subSec.options.map((opt) =>
                opt.id === optionId ? { ...opt, name: value } : opt
              )
            };
          }
          return subSec;
        });
        return { ...section, subSections: updatedSubSections };
      }
      return section;
    });
    setCurrentMenu({ ...currentMenu, sections: updatedSections });
  };

  const handleDeleteSubSection = (sectionId, subSectionId) => {
    const updatedSections = currentMenu.sections.map((section) => {
      if (section.id === sectionId) {
        const updatedSubSections = section.subSections.filter(
          (subSec) => subSec.id !== subSectionId
        );
        return { ...section, subSections: updatedSubSections };
      }
      return section;
    });
    setCurrentMenu({ ...currentMenu, sections: updatedSections });
  };

  // ===== PDF HANDLER =====
  // Handle PDF file input and convert the file to a Base64 string.
  const handlePDFUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const base64String = reader.result.split(",")[1];
        setCurrentMenu({ ...currentMenu, menuPdf: base64String }); // ✅ updated here
      };
    } else {
      alert("Please upload a valid PDF file.");
    }
  };
  
  const handleSaveMenu = async () => {
    if (currentMenu.name.trim() === "") {
      alert("Please enter a menu name.");
      return;
    }
    try {
      if (isEdit) {
        // Update existing menu
        const res = await fetch(`${BASE_URL}/api/menus/${currentMenu.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(currentMenu)
        });
        if (!res.ok) throw new Error("Failed to update menu");
        const updatedMenu = await res.json();
        setMenus((prev) => prev.map((menu) => (menu.id === updatedMenu.id ? updatedMenu : menu)));
        setIsEdit(false);
      } else {
        // Create new menu
        const res = await fetch(`${BASE_URL}/api/menus`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(currentMenu)
        });
        if (!res.ok) throw new Error("Failed to create menu");
        const newMenu = await res.json();
        setMenus((prev) => [...prev, newMenu.menu]); // ✅ newMenu.menu because backend returns { menu: savedMenu }
      }
      // Reset form.
      setShowForm(false);
      setCurrentMenu({ name: "", sections: [], menuPdf: "" }); // ✅ corrected reset
    } catch (error) {
      console.error(error);
    }
  };
  
  // Edit a menu: populate the form with the selected menu's data.
  const handleEditMenu = (menuId) => {
    const menuToEdit = menus.find((menu) => menu.id === menuId);
    if (menuToEdit) {
      setCurrentMenu(menuToEdit);
      setIsEdit(true);
      setShowForm(true);
    }
  };

  // Delete a menu.
  const handleDeleteMenu = async (menuId) => {
    if (!window.confirm("Are you sure you want to delete this menu?")) {
      return;
    }
    try {
      const res = await fetch(`${BASE_URL}/api/menus/${menuId}`, {
        method: "DELETE"
      });
      if (!res.ok) throw new Error("Failed to delete menu");
      setMenus((prev) => prev.filter((menu) => menu.id !== menuId));
    } catch (error) {
      console.error(error);
    }
  };

  // Cancel the form – leave old data unchanged.
  const handleCancel = () => {
    setShowForm(false);
    setCurrentMenu({ name: "", sections: [], menuPdf: "" });
    setIsEdit(false);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>MenuCart Management</h2>
      <button className={styles.btnPrimary} onClick={handleAddMenu}>
        Add Menu
      </button>
      {showForm && (
        <div className={styles.menuForm}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Menu Name:</label>
            <input
              type="text"
              placeholder="Enter Menu Name"
              value={currentMenu.name}
              className={styles.input}
              onChange={(e) =>
                setCurrentMenu({ ...currentMenu, name: e.target.value })
              }
            />
          </div>
          {/* PDF Upload Field */}
          <div className={styles.formGroup}>
            <label className={styles.label}>
              Upload Menu PDF (optional):
            </label>
            <input
              type="file"
              accept="application/pdf"
              className={styles.inputFile}
              onChange={handlePDFUpload}
            />
          </div>
          <div className={styles.sectionsHeader}>
            <h3>Sections</h3>
            <button className={styles.btnSecondary} onClick={handleAddSection}>
              Add Section
            </button>
          </div>
          {currentMenu.sections.map((section) => (
            <div key={section.id} className={styles.section}>
              <div className={styles.sectionControls}>
                <input
                  type="text"
                  placeholder="Section Title"
                  value={section.title}
                  className={styles.input}
                  onChange={(e) =>
                    handleSectionChange(section.id, "title", e.target.value)
                  }
                />
                <label className={styles.toggleLabel}>
                  <input
                    type="checkbox"
                    checked={section.hasSubSections || false}
                    onChange={() => handleToggleHasSubSections(section.id)}
                  />
                  Has Sub-Sections?
                </label>
                {/* If not using sub-sections, show interactive controls */}
                {!section.hasSubSections && (
                  <>
                    <select
                      className={styles.select}
                      value={section.limit}
                      onChange={(e) =>
                        handleSectionChange(section.id, "limit", e.target.value)
                      }
                    >
                      <option value={1}>Any One</option>
                      <option value={2}>Any Two</option>
                      <option value={3}>Any Three</option>
                    </select>
                    <select
                      className={styles.select}
                      value={section.type}
                      onChange={(e) =>
                        handleSectionChange(section.id, "type", e.target.value)
                      }
                      disabled={section.limit > 1}
                    >
                      {section.limit > 1 ? (
                        <option value="checkbox">Checkbox</option>
                      ) : (
                        <>
                          <option value="radio">Radio</option>
                          <option value="dropdown">Dropdown</option>
                        </>
                      )}
                    </select>
                  </>
                )}
                <button
                  className={styles.btnDanger}
                  onClick={() => handleDeleteSection(section.id)}
                >
                  Delete Section
                </button>
              </div>
              {/* If not using sub-sections, render section options */}
              {!section.hasSubSections && (
                <div className={styles.optionsContainer}>
                  <h4 className={styles.optionsHeading}>Section Options</h4>
                  <button
                    className={styles.btnSecondary}
                    onClick={() => handleAddOption(section.id)}
                  >
                    Add Option
                  </button>
                  {section.options.length > 0 && (
                    <div className={styles.optionsList}>
                      {section.options.map((option) => (
                        <input
                          key={option.id}
                          type="text"
                          placeholder="Option name"
                          value={option.name}
                          className={styles.inputOption}
                          onChange={(e) =>
                            handleOptionChange(section.id, option.id, e.target.value)
                          }
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
              {/* Render sub-sections if using them */}
              {section.hasSubSections && (
                <div className={styles.subSectionsContainer}>
                  <h4 className={styles.optionsHeading}>SubSections</h4>
                  <button
                    className={styles.btnSecondary}
                    onClick={() => handleAddSubSection(section.id)}
                  >
                    Add SubSection
                  </button>
                  {section.subSections &&
                    section.subSections.map((subSec) => (
                      <div key={subSec.id} className={styles.subSection}>
                        <div className={styles.subSectionControls}>
                          <input
                            type="text"
                            placeholder="Enter SubSection Title"
                            value={subSec.title}
                            className={styles.input}
                            onChange={(e) =>
                              handleSubSectionChange(
                                section.id,
                                subSec.id,
                                "title",
                                e.target.value
                              )
                            }
                          />
                          <select
                            className={styles.select}
                            value={subSec.limit}
                            onChange={(e) =>
                              handleSubSectionChange(
                                section.id,
                                subSec.id,
                                "limit",
                                e.target.value
                              )
                            }
                          >
                            <option value={1}>Any One</option>
                            <option value={2}>Any Two</option>
                            <option value={3}>Any Three</option>
                          </select>
                          <select
                            className={styles.select}
                            value={subSec.type}
                            onChange={(e) =>
                              handleSubSectionChange(
                                section.id,
                                subSec.id,
                                "type",
                                e.target.value
                              )
                            }
                            disabled={subSec.limit > 1}
                          >
                            {subSec.limit > 1 ? (
                              <option value="checkbox">Checkbox</option>
                            ) : (
                              <>
                                <option value="radio">Radio</option>
                                <option value="dropdown">Dropdown</option>
                              </>
                            )}
                          </select>
                          <button
                            className={styles.btnDanger}
                            onClick={() =>
                              handleDeleteSubSection(section.id, subSec.id)
                            }
                          >
                            Delete SubSection
                          </button>
                        </div>
                        <div className={styles.optionsContainer}>
                          <h5 className={styles.optionsHeading}>
                            SubSection Options
                          </h5>
                          <button
                            className={styles.btnSecondary}
                            onClick={() =>
                              handleAddSubSectionOption(section.id, subSec.id)
                            }
                          >
                            Add Option
                          </button>
                          {subSec.options.length > 0 && (
                            <div className={styles.optionsList}>
                              {subSec.options.map((option) => (
                                <input
                                  key={option.id}
                                  type="text"
                                  placeholder="Sub Option name"
                                  value={option.name}
                                  className={styles.inputOption}
                                  onChange={(e) =>
                                    handleSubSectionOptionChange(
                                      section.id,
                                      subSec.id,
                                      option.id,
                                      e.target.value
                                    )
                                  }
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          ))}
          <div className={styles.formActions}>
            <button className={styles.btnDanger} onClick={handleCancel}>
              Cancel
            </button>
            <button className={styles.btnPrimary} onClick={handleSaveMenu}>
              Save Menu
            </button>
          </div>
        </div>
      )}
     <div className={styles.menuList}>
  <h3>Existing Menus</h3>
  {/* {menus.length === 0 && <p>No menus saved yet.</p>}
  {menus.map((menu) => (
    <div key={menu.id} className={styles.menuItem}>
      <h4 className={styles.menuTitle}>{menu.name}</h4>

      {menu.menuPdf ? (
        <div className={styles.pdfContainer}>
          <p className={styles.pdfStatus}>📄 PDF Uploaded</p>
          <button
            className={styles.btnPrimary}
            onClick={() => window.open(`data:application/pdf;base64,${menu.menuPdf}`, "_blank")}
          >
            View PDF
          </button>
        </div>
      ) : (
        <p className={styles.pdfStatus}>❌ No PDF uploaded</p>
      )}

      {menu.sections.map((section) => (
        <div key={section.id} className={styles.menuSection}>
          <strong>{section.title}</strong>
          <span className={styles.sectionInfo}>
            {" "}
            ({section.type}, Limit: {section.limit})
          </span>
          <ul className={styles.optionList}>
            {section.options.map((opt) => (
              <li key={opt.id} className={styles.optionItem}>
                {opt.name}
              </li>
            ))}
          </ul>
          {section.subSections && section.subSections.length > 0 && (
            <div className={styles.menuSubSection}>
              <h5>SubSections:</h5>
              {section.subSections.map((subSec) => (
                <div key={subSec.id} className={styles.subSectionPreview}>
                  <em>{subSec.title}</em> ({subSec.type}, Limit: {subSec.limit})
                  <ul className={styles.optionList}>
                    {subSec.options.map((opt) => (
                      <li key={opt.id} className={styles.optionItem}>
                        {opt.name}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      <div className={styles.menuActions}>
        <button className={styles.btnPrimary} onClick={() => handleEditMenu(menu.id)}>
          Edit
        </button>
        <button className={styles.btnDanger} onClick={() => handleDeleteMenu(menu.id)}>
          Delete
        </button>
      </div>
    </div>
  ))} */}
{menus.length === 0 && <p>No menus saved yet.</p>}
{menus.map((menu) => (
  <div key={menu._id} className={styles.menuItem}> {/* ✅ Corrected _id */}
    <h4 className={styles.menuTitle}>{menu.name}</h4>

    {/* ✅ Show PDF status */}
    {menu.menuPdf ? (
      <div className={styles.pdfContainer}>
        <p className={styles.pdfStatus}>📄 PDF Uploaded</p>
        <button
          className={styles.btnPrimary}
          onClick={() => {
            if (menu.menuPdf && menu.menuPdf.length > 100) {
              // Open PDF using Base64 data string
              const pdfUrl = `data:application/pdf;base64,${menu.menuPdf}`;
              window.open(pdfUrl, "_blank");
            } else {
              alert("Invalid or corrupted PDF data.");
            }
          }}
        >
          View PDF
        </button>
      </div>
    ) : (
      <p className={styles.pdfStatus}>❌ No PDF uploaded</p>
    )}

    {menu.sections?.map((section) => (
      <div key={section.id} className={styles.menuSection}>
        <strong>{section.title}</strong>
        <span className={styles.sectionInfo}>
          ({section.type}, Limit: {section.limit})
        </span>
        <ul className={styles.optionList}>
          {section.options.map((opt) => (
            <li key={opt.id} className={styles.optionItem}>
              {opt.name}
            </li>
          ))}
        </ul>

        {section.subSections && section.subSections.length > 0 && (
          <div className={styles.menuSubSection}>
            <h5>SubSections:</h5>
            {section.subSections.map((subSec) => (
              <div key={subSec.id} className={styles.subSectionPreview}>
                <em>{subSec.title}</em> ({subSec.type}, Limit: {subSec.limit})
                <ul className={styles.optionList}>
                  {subSec.options.map((opt) => (
                    <li key={opt.id} className={styles.optionItem}>
                      {opt.name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    ))}

    <div className={styles.menuActions}>
      <button className={styles.btnPrimary} onClick={() => handleEditMenu(menu._id)}>
        Edit
      </button>
      <button className={styles.btnDanger} onClick={() => handleDeleteMenu(menu._id)}>
        Delete
      </button>
    </div>
  </div>
))}


  
</div>
</div>
  );
};

export default MenuCartManagement;