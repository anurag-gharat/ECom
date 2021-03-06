import React,{useState} from 'react'
import Base from "../core/Base"
import {signup} from '../auth/helper/index'
import { useHistory } from 'react-router-dom'
const Signup = () => {


    const [values, setValues] = useState({
        name:"",
        lastname:"",
        email:"",
        password:"",
        error:"",
        success:false
    })

    const {name,lastname,email,password,error,success}= values
    const handleChange=name=>event=>{
        setValues({...values,error:false,[name]:event.target.value})
    }
    const history = useHistory();
    const onSubmit=event=>{
        
        event.preventDefault()
        setValues({
            ...values,error:false
        })
        signup({name,lastname,email,password})
        .then(data=>{
            if(data.error){
                setValues({...values,error:data.error,success:false})
                onError()
            }
            else{
                setValues({...values,name:"",lastname:"",email:"",password:"",error:"",success:true})
                onSuccess()
                history.push("/signin");
            }
        })
        .catch(error=>console.log(error))
    }
    const onSuccess=()=>{
        return(
                alert("Successfully created a profile redirecting to login page" )
        )
    }
    const onError=()=>{
        return(
                alert(error)
        )
    }


    const signupform=()=>{
        return(
            <div className="w-80 bg-light mx-auto signupcontainer my-5 shadow-lg">
                <div className="row">
                    <div className="col-md-7">
                        <img src="https://images.pexels.com/photos/1858407/pexels-photo-1858407.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" className="w-100 signuppic"></img>
                    </div>
                    <div className="col-md-5 d-flex flex-column justify-content-center text-center">
                        <div className="w-100 p-0 m-0">
                            <h1>SIGNUP</h1>
                        </div>
                        <form className="form-group px-3 w-100" onSubmit={onSubmit}>
                            <label for="fname" className="mt-3">First Name</label>
                            <input className="form-control" type="text" onChange={handleChange("name")} value={name} />
                            <label for="fname"className="mt-3">Last Name</label>
                            <input className="form-control"  type="text"  onChange={handleChange("lastname")} value={lastname}/>
                            <label for="fname" className="mt-3">Email</label>
                            <input className="form-control" type="email"  onChange={handleChange("email")} value={email} />
                            <label for="fname" className="mt-3">Password</label>
                            <input className="form-control"  type="password"  onChange={handleChange("password")} value={password} />
                            <button className="btn-primary mx-auto mt-3">Signup</button>
                        </form>
                    </div>

                </div>
            </div>
            
        )
    }
    return (
        <Base>
            {signupform()}
        </Base>
    )
}

export default Signup