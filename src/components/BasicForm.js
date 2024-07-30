import "pepsico-ds/css";
import { TextInput, Button, Dropdown, Radio, Checkbox, Toggle, DataTable , InputItem} from "pepsico-ds";
import { useState } from "react";
import '../App.css';
import UserList from "./UserList";


function BasicForm(props) {
    let buttonDisabled=true;
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const [showDataTable, setShowDataTable]=useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    const [userRegistration, setUserRegistration] = useState({
        username: "",
        email: "",
        password: "",
        gender: "",
        age: "",
        skills: [],
        remembertheinfo: false,
        action:""
    });

    const [errors, setErrors] = useState({
        username: "",
        email: "",
        password: ""
    });

    const validateUsername = (username) => {
        const regex = /^[a-zA-Z0-9]{1,10}$/;
        return regex.test(username);
    };

    const validateEmail = (email) => {
        const regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        return regex.test(email);
    };

    const validatePassword = (password) => {
        const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,13}$/;
        return regex.test(password);
    };

    const handleInput = (e) => {
        if (!e || !e.target) return;
        const { name, value } = e.target;
        let error = "";

        switch (name) {
            case "username":
                error = validateUsername(value) ? "" : "Username should be max 10 letters or numbers and should not contain special characters.";
                break;
            case "email":
                error = validateEmail(value) ? "" : "Email should be a valid gmail address ending with @gmail.com.";
                break;
            case "password":
                error = validatePassword(value) ? "" : "Password should be between 8 to 13 characters including special characters.";
                break;
            default:
                break;
        }

        setErrors({ ...errors, [name]: error });
        setUserRegistration({ ...userRegistration, [name]: value });
    };

    const setGenderValue = (gender) => {
        if (gender && gender[0].id) {
            setUserRegistration({ ...userRegistration, gender: gender[0].displayText });
        } else {
            setUserRegistration({ ...userRegistration, gender: "" });
        }
    };
    const handleBack=()=>{
        setShowDataTable(false);
    }

    const setAgeValue = (age) => {
        if (age==0 ||age==1){
            let ageRange = age === 0 ? "21-30" : "31-40";
            setUserRegistration({ ...userRegistration, age: ageRange });   
        }
        else{
            setUserRegistration({ ...userRegistration, age: "" }); 
        }
    };

    const skillsList = [
       "Python","C","Java","Others"
    ];

    const setSkillValue = (skill, isSelected) => {
        setUserRegistration({ 
            ...userRegistration, 
            skills: isSelected ? [...userRegistration.skills, skill] : userRegistration.skills.filter(s => s !== skill)
        });
    };

    const setInfoValue = (isSelected) => {
        setUserRegistration({ ...userRegistration, remembertheinfo: isSelected });
    };

    // const resetForm = ( )=>{
        
    //     setAgeValue(null);
    //     setGenderValue();
    //     setSkillValue('python', false);
    //     setSkillValue('c', false);
    //     setSkillValue('java', false);
    //     setSkillValue('others', false);
    //     setUserRegistration({ username: "", email: "", password: "", gender: "", age: "", skills: [], remembertheinfo: false , actione: "" });
        
        
    // };
    const resetForm = () => {
        window.location.reload();
    };

    const validDetails=validateUsername(userRegistration.username) && validateEmail(userRegistration.email) && validatePassword(userRegistration.password) &&
    userRegistration.gender && userRegistration.age && userRegistration.skills.length > 0;
    buttonDisabled=!(validDetails)
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validDetails) {
            if (isEditing) {
                const updatedRecord = { ...userRegistration, id: editId };
                updateRecord(updatedRecord);
                setIsEditing(false);
                setEditId(null);
            } else {
                const newRecord = { ...userRegistration, id: new Date().getTime().toString() };
                setRecords([...records, newRecord]);
            }
            console.log(records);
            resetForm();
            setShowDataTable(true);
        } else {
            alert("Please fill all the fields and select at least one skill");
        }
    };

    const updateRecord = (updatedRecord) => {
        setRecords(records.map(record => (record.id === updatedRecord.id ? updatedRecord : record)));
        setShowDataTable(true);
    };

    const handleEdit = (id) => {
        const recordToEdit = records.find(record => record.id === id);
        if (recordToEdit) {
            setUserRegistration({ ...recordToEdit });
            setIsEditing(true);
            setEditId(id);
            setShowDataTable(false);
        }
    };

    const handleDelete = (id) => {
        setRecords(records.filter(record => record.id !== id));
    };

    const genderList = [
        { displayText: 'Female', id: 1, isBadge: false },
        { displayText: 'Male', id: 2, isBadge: false }
    ];

    const ageList = [
        'Age should be between 21-30',
        'Age should be between 31-40'
    ];

    const handleMouseOver = () => {
        if (buttonDisabled) {
          setTooltipVisible(true);
        }
      };
   
      const handleMouseOut = () => {
        setTooltipVisible(false);
      };

    const [records, setRecords] = useState([]);

    return (
        <>
            {!showDataTable && 
            <div>
                <h3>Sign in Form</h3>
                <form action="" onSubmit={handleSubmit}>
            <div>
                <TextInput error={errors["username"]}   label="Username" autoComplete="off" onChange={handleInput} name="username" value={userRegistration.username} placeholderText="Enter Your Name Here" required />
                <TextInput error={errors["email"]}   label="mail" autoComplete="off" onChange={handleInput} name="email" value={userRegistration.email} placeholderText="Enter Your Email" required />
                <TextInput error={errors["password"]}  label="Password" type="password" autoComplete="off" onChange={handleInput} name="password" value={userRegistration.password} placeholderText="Password" required />
         
                <Dropdown
                    childList={genderList}
                    isRequired
                    label="Gender"
                    selection="single"
                    setSelectedValue={setGenderValue}
                    size="medium"
                    className="dropdown"
                    required
                />
                <Radio
                    items={ageList}
                    label="Age"
                    onUpdate={setAgeValue}
                    reference="radio button"
                    size="small"
                    required
                />
                {skillsList.map((skill,index)=>(
                    <Checkbox
                    helperText={index==0?"Select skills":""}
                    onUpdate={(isSelected) => setSkillValue(skill, isSelected)}
                    text={skill}
                    required
                   />
                ))}
                <Toggle
                    label="Remember the info"
                    onUpdate={setInfoValue}
                    onClick={setInfoValue}
                    size="medium"
                    name="remembertheinfo"
                    value={userRegistration.remembertheinfo}
                />
                <div className="button-container" >
                <Button
                    type="submit"
                    iconLeadingVariant="outlined"
                    iconTrailingVariant="outlined"
                    size="large"
                    text="Submit"
                    variant="primary"
                    className="button"
                    disabled={buttonDisabled}
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                    required
                />
                {tooltipVisible && (
                        <div className="tooltip"><h3>Fill all the required fields!</h3></div>
                )}
                <Button
                    type="reset"
                    size="large"
                    text="Reset"
                    onClick={resetForm}
                    variant="primary"
                    className="button "
                />
                 {isEditing && (
                    <Button
                        type="button"
                        size="large"
                        text="Cancel"
                        onClick={() => { setIsEditing(false); setEditId(null); setShowDataTable(true); }}
                        variant="secondary"
                        className="button"
                    />
                )}
                </div>
                
                <Button
                    type="button"
                    size="large"
                    text="Data Table"
                    onClick={setShowDataTable}
                    variant="secondary"
                    className="right-button"
                />
             </div>
         </form>
         </div>
            
}
{
    showDataTable&&
    <UserList props={records} handleBack={handleBack} handleEdit={handleEdit} handleDelete={handleDelete}/> 
}
        </>
    );
}

export default BasicForm;