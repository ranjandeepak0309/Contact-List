import { useState,useRef ,useEffect,} from "react";
import {db} from "./firebaseInit";
import { collection,doc,  setDoc, onSnapshot, deleteDoc } from "firebase/firestore"; 

export default function ContactList() {

   
    const [formData, setFormData] = useState({ name: "", contactNo: "" });
    const [contacts, setContacts] = useState([]);


    const nameRef =useRef(null);

    useEffect(()=>{
        

        // Real Time Update
        const unsub = onSnapshot(collection(db,"contacts"),(snapShot)=>{
            const contacts = snapShot.docs.map((doc)=>{
                        return{
                            id:doc.id,
                            ...doc.data()
        
                        }
                    })
                    
                    setContacts(contacts);
        })

    },[])

     async function handleSubmit(e) {
        e.preventDefault();
        
          const docRef = doc(collection(db, "contacts"))
          await setDoc(docRef,{
           name: formData.name,
           contactNo:  formData.contactNo,
           createdOn : new Date()
  });

        setFormData({ name : "" ,contactNo:""}); 
        nameRef.current.focus();
       
    }
    async function removeBlog(id){
        
        const docref = doc(db,"contacts",id);
       await deleteDoc(docref);

    }
    useEffect(()=>{
        nameRef.current.focus();
    },[])


    return (
        <>
            
            <h1>Contact List</h1>

            {/* Division created to provide styling of section to the form */}
            <div className="section">

                {/* Form for to write the name and contact no */}
                <form onSubmit={handleSubmit}>

                    {/* Row component to create a row for first input field */}
                    <Row label="Name">
                        <input className="input"
                        type="string"
                            value={formData.name}
                            ref = {nameRef}
                            placeholder="Enter the Name"
                            onChange={(e) => setFormData({ name: e.target.value, contactNo: formData.contactNo })} />
                    </Row >

                    {/* Row component to create a row for Text area field */}
                    <Row label="Contact Number">
                        <input className="input "
                        type="number"
                            value={formData.contactNo}
                            placeholder="Contact Number.."
                            required
                            onChange={(e) => setFormData({ name: formData.name, contactNo: e.target.value })} />
                    </Row >

                    {/* Button to submit the contact */}
                    <button className="btn">SAVE</button>
                </form>

            </div>

            <hr />

            {/* Section where submitted blogs will be displayed */}
            {/* <h2> Blogs </h2> */}
            {contacts.map((contact, i) => (
                <div className="contact" key={i}>
                    <h3>{contact.name}</h3>
                    <h4>{contact.contactNo}</h4>
                    <div className="contact-btn">
                    <button className = "remove"onClick={()=>removeBlog(contact.id)}>Delete</button>

                    </div>

                    
                </div>


            ))}

        </>
    )
}

//Row component to introduce a new row section in the form
function Row(props) {
    const { label } = props;
    return (
        <>
            <label>{label}<br /></label>
            {props.children}
            <hr />
        </>
    )
}
