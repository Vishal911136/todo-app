import {useEffect, useState} from 'react';
/* localstorage */
let alertMsg = document.getElementById('alertMsg');
const getLocalItems = () =>{
    let localList = localStorage.getItem('list');
    if(localList){
        return JSON.parse(localStorage.getItem('list'));
    }
    else{
        return [];
    }
}


const Todo = () =>{
    const [inputItem, setinputItem] = useState('');
    const [listItem,setlistItem] = useState(getLocalItems());
    const [toggleBtn, settoggleBtn] = useState(true);
    const [editItem, seteditItem] = useState(null);

    const addItem = () =>{
        let alertMsg = document.getElementById('alertMsg');
        if(inputItem.length<3){
            alertMsg.style.visibility="visible";
        }else if(inputItem && !toggleBtn){

            setlistItem(
                listItem.map((ele) =>{
                    if(ele.id === editItem){
                        return {...ele, name: inputItem.trim()}
                    }
                    return ele;
                })
            )
                settoggleBtn(true);
                setinputItem('');
                seteditItem(null);
                alertMsg.style.visibility="hidden"
        }
        else{
            const allInputData = {id: new Date().getTime().toString(), name: inputItem}
            setlistItem([...listItem,allInputData]);
            setinputItem('');
            alertMsg.style.visibility="hidden"
        }
    }

    /* Delete Items */
    const deleteItem = (ind) =>{
        const updatedata = listItem.filter((ele) =>{
            return ind !== ele.id;
        })
        setlistItem(updatedata);
    }

    /* Delete all */
    const deleteAll = () =>{
        setlistItem([]);
    }

// Update
    const editListItem = (id) =>{
        let editItem = listItem.find((ele) => {
            return ele.id === id;
        });
        console.log(editItem);
        settoggleBtn(false);
        setinputItem(editItem.name);

        seteditItem(id)
    }


    // close button

    let closeAlert = () =>{
        let alertMsg = document.getElementById('alertMsg');
        alertMsg.style.visibility="hidden";
    }


    /* Local Storage */
    useEffect(() => {
        localStorage.setItem('list',JSON.stringify(listItem))
    },[listItem])
    return(
        <div className="section main_div">
            <div className="center_div">

            <div className="alert__msg" id="alertMsg" style={{visibility: "hidden"}}>
                <p className="msg">Enter Minimum 3 Character</p> <hr />
                <div className="button__div">
                    <button onClick={closeAlert} >OK</button>
                </div>
            </div>

                <div className="heading section">
                    <h2>Todo List 📃</h2>
                </div>

                <div className="section input_section">
                    <input 
                        type="text"
                        placeholder="🖋 Enter Items"
                        value={inputItem}
                        onChange={(e) => {
                            setinputItem(e.target.value)
                            alertMsg.style.visibility="hidden"
                        }}
                        onKeyPress = {(e) =>{
                            if(e.key==="Enter"){
                                addItem();
                            }
                        }}
                    />
                    {
                        toggleBtn? <i className="fas fa-plus" onClick={addItem} title="Add Item"></i> :
                                <i className="fas fa-edit" onClick={addItem} title="Update Item"></i>
                    }
                </div>

                <div className="list_center">
                    <div className="section list_section">
                    {
                        listItem.map((ele) =>{
                            return(
                                <div className="items section" key={ele.id}>
                                    <h4>{ele.name}</h4>
                                    <i className="fas fa-edit" onClick={()=> editListItem(ele.id)} title="Edit Item"></i>
                                    <i className="fas fa-trash-alt" onClick={()=> deleteItem(ele.id)} title="Delete Item"></i>
                                </div>
                            )
                        })
                    }
                    </div>
                </div>

                <div className="clearbtn section">
                    <button className="btn" onClick={deleteAll}>Clear All</button>
                </div>
            </div>
        </div>
    );
}
export default Todo;