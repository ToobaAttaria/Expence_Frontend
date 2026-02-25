import { X } from 'lucide-react';
import { Edit, Trash } from 'lucide-react';
import InputComponent from './input';
import { useState } from 'react';

function NewCategory({ showCategory, setShowCategory }) {
    const [InputBox, setInputBox] = useState(false);
    const [Input, setInput] = useState("");
    const [editingIndex, setEditingIndex] = useState(null);

    function deleteCategory(index) {
        setShowCategory(showCategory.filter((_, i) => i !== index));
    }

    function EditCategory(index) {
        setInput(showCategory[index]);
        setEditingIndex(index);
    }


    function handleKeyPress(e, index) {
        if (e.key === "Enter" && Input.trim() !== "") {
            const updatedCategories = [...showCategory];
            updatedCategories[index] = Input;
            setShowCategory(updatedCategories);
            setEditingIndex(null);
            setInput("");
        }
    }

    return (
        <>
            <div className="blurbackground">
                <div className="MainCategoryWindow">
                    <div className="header flex">
                        <h1>New Category</h1>
                        <button className="cancelBtn" title="Close">
                            <X size={20} />
                        </button>
                    </div>
                    <div className="categoryForm">
                        <p onClick={() => setInputBox(true)} className="addCategory" title="Add New Category">
                            + add New
                        </p>

                        {InputBox && (
                            <InputComponent
                                Input={Input}
                                setInput={setInput}
                                setInputBox={setInputBox}
                                showCategory={showCategory}
                                setShowCategory={setShowCategory}
                            />
                        )}

                        <div className='CategorylistContainer'>
                            {showCategory.map((category, index) => (
                                <div key={index} className='items'>
                                    {editingIndex === index ? (
                                        <input
                                            className='ItemCategory'
                                            value={Input}
                                            onChange={(e) => setInput(e.target.value)}
                                            onKeyDown={(e) => handleKeyPress(e, index)}
                                            autoFocus
                                        />
                                    ) : (
                                        <span className='ItemCategory'>{category}</span>
                                    )}

                                    <span onClick={() => EditCategory(index)} title="Edit">
                                        <Edit size={18} />
                                    </span>

                                    <span onClick={() => deleteCategory(index)} title="Delete">
                                        <Trash size={18} />
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NewCategory;
