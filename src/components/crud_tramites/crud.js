import { useRef, useState } from "react";
import { useMediaQuery } from "react-responsive"
import { useForm } from 'react-hook-form';

export default function ComponentCrudTramites(){
    const isTablet = useMediaQuery({query : '(max-width: 991px)'})
    const isMobile = useMediaQuery({query : "(max-width: 675px)"});

    const ref_form = useRef(null);
    const [send_datos,setSend_datos] = useState(false);
    const [active_style_description,setActive_style_description] = useState(false);
    const [list_icons_add,setList_icons_add] = useState([]);
    const {register, formState : { errors }, handleSubmit} = useForm();

    const onSubmit = (data) => {
        setSend_datos(true);
        ref_form.current.reset();
    }
    const message_dragdrop = () => {
        return {
            opacity : "0.4",
            fontSize : (isMobile)? "37px" : "55px",
            transform : "translateY(40px)"
        }
    }
    const style_inputs = (input) => {
        return (input?.type === "required" || input?.type === "maxLength" || input?.type === "min" || input?.type === "pattern")? "form-control shadow-none border-danger" : "form-control shadow-none border-primary";
    }
    const message_inputs = (input,name) => {
        return <span style={(input?.type !== "required" && input?.type !== "maxLength" && input?.type !== "min" && input?.type !== "pattern")? {} : { color : "red" }}>
            {
                (input?.type === "required")? (name === "Dias")? "Los dias son requeridos" : (name === "Clave sysacad")? "La clave sysacad es requerida" : "El "+name.toLowerCase()+" es requerido" :
                (input?.type === "min")? (name === "Dias")? "Los dias deben tener un minimo de 0" : "El "+name.toLowerCase()+" debe tener un minimo 0" : 
                (input?.type === "pattern")? "El "+name.toLowerCase()+" solo permite letras" :
                (input?.type === "maxLength")? (name === "Clave sysacad")? "La clave sysacad debe tener menos de 110 caracteres" : "El "+name.toLowerCase()+" debe tener menos de 10 caracteres" : name
            }
        </span>
    }
    const message_dropdown = (input,name) => {
        return <span style={(input?.type !== "required")? {} : { color : "red" }}>
            {
                (input?.type === "required")? (name === "Categoria" || name === "Especialidad")? "La "+name.toLowerCase()+" es requerida" : "El tipo de usuario es requerido" : ""
            }
        </span>
    }

    const start_drag = (e,item) => {
        e.dataTransfer.setData("item_id",item + 1);
    }
    const dragging_over = (e) => {
        setActive_style_description(true);
        e.preventDefault();
    }
    const on_drop = (e) => {
        setActive_style_description(false);
        const item_id = e.dataTransfer.getData("item_id");
        if(item_id == "2" || item_id == "6"){
            if(!list_icons_add.includes(item_id)){
                setList_icons_add((prev) => [...prev,item_id])
            }
        }
    }
    const remove_input = (e,icon) => {
        e.preventDefault();
        setList_icons_add(list_icons_add.filter(i => i != icon));
    }
    const icons = [
        {
            name : "Text",
            icon :  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-body-text" viewBox="0 0 16 16"><path fillRule="evenodd" d="M0 .5A.5.5 0 0 1 .5 0h4a.5.5 0 0 1 0 1h-4A.5.5 0 0 1 0 .5Zm0 2A.5.5 0 0 1 .5 2h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5Zm9 0a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5Zm-9 2A.5.5 0 0 1 .5 4h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5Zm5 0a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5Zm7 0a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5Zm-12 2A.5.5 0 0 1 .5 6h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5Zm8 0a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5Zm-8 2A.5.5 0 0 1 .5 8h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5Zm7 0a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5Zm-7 2a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1h-8a.5.5 0 0 1-.5-.5Zm0 2a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5Zm0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Z"/></svg>
        },
        {
            name : "Num",
            icon :  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-123" viewBox="0 0 16 16"><path d="M2.873 11.297V4.142H1.699L0 5.379v1.137l1.64-1.18h.06v5.961h1.174Zm3.213-5.09v-.063c0-.618.44-1.169 1.196-1.169.676 0 1.174.44 1.174 1.106 0 .624-.42 1.101-.807 1.526L4.99 10.553v.744h4.78v-.99H6.643v-.069L8.41 8.252c.65-.724 1.237-1.332 1.237-2.27C9.646 4.849 8.723 4 7.308 4c-1.573 0-2.36 1.064-2.36 2.15v.057h1.138Zm6.559 1.883h.786c.823 0 1.374.481 1.379 1.179.01.707-.55 1.216-1.421 1.21-.77-.005-1.326-.419-1.379-.953h-1.095c.042 1.053.938 1.918 2.464 1.918 1.478 0 2.642-.839 2.62-2.144-.02-1.143-.922-1.651-1.551-1.714v-.063c.535-.09 1.347-.66 1.326-1.678-.026-1.053-.933-1.855-2.359-1.845-1.5.005-2.317.88-2.348 1.898h1.116c.032-.498.498-.944 1.206-.944.703 0 1.206.435 1.206 1.07.005.64-.504 1.106-1.2 1.106h-.75v.96Z"/></svg>
        },
        {
            name : "Table",
            icon :  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-table" viewBox="0 0 16 16"><path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm15 2h-4v3h4V4zm0 4h-4v3h4V8zm0 4h-4v3h3a1 1 0 0 0 1-1v-2zm-5 3v-3H6v3h4zm-5 0v-3H1v2a1 1 0 0 0 1 1h3zm-4-4h4V8H1v3zm0-4h4V4H1v3zm5-3v3h4V4H6zm4 4H6v3h4V8z"/></svg>
        },
        {
            name : "Date",
            icon :  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-calendar" viewBox="0 0 16 16"><path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/></svg>
        },
        {
            name : "Bool",
            icon :  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-lightbulb" viewBox="0 0 16 16"><path d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13a.5.5 0 0 1 0 1 .5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1 0-1 .5.5 0 0 1 0-1 .5.5 0 0 1-.46-.302l-.761-1.77a1.964 1.964 0 0 0-.453-.618A5.984 5.984 0 0 1 2 6zm6-5a5 5 0 0 0-3.479 8.592c.263.254.514.564.676.941L5.83 12h4.342l.632-1.467c.162-.377.413-.687.676-.941A5 5 0 0 0 8 1z"/></svg>
        },
        {
            name : "Pass",
            icon :  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-key" viewBox="0 0 16 16"><path d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8zm4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5z"/><path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/></svg>
        },
        {
            name : "Select",
            icon :  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-card-checklist" viewBox="0 0 16 16"><path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/><path d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0zM7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z"/></svg>
        },
        {
            name : "Check",
            icon :  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-check2-square" viewBox="0 0 16 16"><path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5H3z"/><path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/></svg>
        }
    ]

    const add_icons = (icon) => {
        switch(icon){
            case "2": 
                return <>
                    <div className="d-flex justify-content-between">
                        <label htmlFor="input-legajo">
                            { message_inputs(errors.legajo,"Legajo") }
                        </label>
                        <button className="border-0 p-0 bg-transparent" onClick={(e) => remove_input(e,icon)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-x text-danger" viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                            </svg>
                        </button>
                    </div>
                    <input type="number" className={"mb-3 "+style_inputs(errors.legajo)} id="input-legajo" {...register('legajo',{
                        required : true,
                        min : 0,
                        maxLength : 10
                    })}/>
                </>
            case "6": 
                return <>
                    <div className="d-flex justify-content-between">
                        <label className="d-flex justify-content-between" htmlFor="input-clave-sysacad">
                            { message_inputs(errors.clave_sysacad,"Clave sysacad") }
                        </label>
                        <button className="border-0 p-0 bg-transparent" onClick={(e) => remove_input(e,icon)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-x text-danger" viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                            </svg>
                        </button>
                    </div>
                    <input type="password" className={"mb-3 "+style_inputs(errors.clave_sysacad)} id="input-clave-sysacad" {...register('clave_sysacad',{
                        required : true,
                        min : 0,
                        maxLength : 110
                    })}/>
                </>
        }
    }

    return (
        <section className="container pt-3 pb-5">
            <section className="text-center">
                { (isMobile)? <h4 className="text-primary font-weight-bold">FORMULARIO TRAMITES</h4> : <h1 className="text-primary font-weight-bold">FORMULARIO TRAMITES</h1> }
            </section>
            <section className="row py-3 d-flex">
                <article className={(isTablet)? "col-12 order-2 mt-3" : "col-10" }>
                    <form method="POST" action="" ref={ref_form} onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label htmlFor="input-title">
                                { message_inputs(errors.title,"Titulo") }
                            </label>
                            <input type="text" className={style_inputs(errors.title)} id="input-title" {...register('title', {
                                required : true,
                                maxLength : 20,
                                pattern : /^([a-zA-Záéíóú]+)(\s[a-zA-Z]+)*$/i
                            })}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="input-project">
                                { message_inputs(errors.project,"Proyecto") }
                            </label>
                            <input type="number" className={style_inputs(errors.project)} id="input-project" {...register('project',{
                                required : true,
                                min : 0,
                                maxLength : 10
                            })}/>
                        </div>
                        <div className="row">
                            <div className="col form-group">
                                <label htmlFor="input-indicator">
                                    { message_inputs(errors.indicator,"Indicador") }
                                </label>
                                <input type="number" className={style_inputs(errors.indicator)} id="input-indicator" {...register('indicator',{
                                    required : true,
                                    min : 0,
                                    maxLength : 10
                                })}/>
                            </div>
                            <div className="col form-group">
                                <label htmlFor="input-agent">
                                    { message_inputs(errors.agent,"Agente") }
                                </label>
                                <input type="number" className={style_inputs(errors.agent)} id="input-agent" {...register('agent',{
                                    required : true,
                                    min : 0,
                                    maxLength : 10
                                })}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col form-group">
                                <label htmlFor="input-days">
                                    { message_inputs(errors.days,"Dias") }    
                                </label>
                                <input type="number" className={style_inputs(errors.days)} id="input-days" {...register('days',{
                                    required : true,
                                    min : 0,
                                    maxLength : 10
                                })}/>
                            </div>
                            <div className="col form-group">
                                <label htmlFor="input-aux">
                                    { message_inputs(errors.aux,"Auxiliar") }
                                </label>
                                <input type="text" className={style_inputs(errors.aux)} id="input-aux" {...register('aux',{
                                    required : true
                                })}/>
                            </div>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="input-description form-group">Descripcion</label>
                            <div onDrop={(e) => on_drop(e)} droppable="true" onDragOver={(e) => dragging_over(e)} className={(active_style_description)? "position-relative border border-danger rounded p-3":"position-relative border border-primary rounded p-3"} style={{height : (list_icons_add.length==0)? "200px" : "auto"}}>
                                { list_icons_add.length==0 && <div className="position-absolute w-100 text-center px-3 text-secondary" style={message_dragdrop()}>Arrastrar y soltar</div> }
                                {
                                    list_icons_add.map((icon,index) => {
                                        return <div key={index}>{ add_icons(icon) }</div>
                                    })
                                }
                            </div>
                        </div>
                        <label className="mt-0">
                            { message_dropdown(errors.category,"Categoria") }
                        </label> 
                        <select className={style_inputs(errors.category)} {...register('category',{ required : true})}>
                            <option value="">Seleccionar categoria...</option>
                            <option value="Name 1">Name 1</option>
                            <option value="Name 2">Name 2</option>
                        </select>
                        <label className="mt-3">
                            { message_dropdown(errors.user_type,"Tipo de usuario") }
                        </label> 
                        <select className={style_inputs(errors.user_type)} {...register('user_type',{ required : true})}>
                            <option value="">Seleccionar tipo usuario...</option>
                            <option value="Name 1">Name 1</option>
                            <option value="Name 2">Name 2</option>
                        </select>
                        <label className="mt-3">
                            { message_dropdown(errors.specialty,"Especialidad") }
                        </label> 
                        <select className={style_inputs(errors.specialty)} {...register('specialty',{ required : true})}>
                            <option value="">Seleccionar especialidad...</option>
                            <option value="Name 1">Name 1</option>
                            <option value="Name 2">Name 2</option>
                        </select>
                        <div className={(isMobile)? "row px-3 pt-4":"row px-3 pt-5"}>
                            <button type="button" className={(isMobile)? "mr-1 col btn btn-danger d-flex justify-content-center align-items-center" : "mr-5 col btn btn-danger d-flex justify-content-center align-items-center" }>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                </svg>
                                <span className="mx-2 font-weight-bold">Cancelar</span>
                            </button>
                            <button type="submit" className={(isMobile)? "ml-1 col btn btn-primary d-flex justify-content-center align-items-center" : "ml-5 col btn btn-primary d-flex justify-content-center align-items-center" }>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-check-circle" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                    <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                                </svg>
                                <span className="mx-2 font-weight-bold">Aceptar</span>
                            </button>
                        </div>
                        {send_datos &&
                            <div className="mt-5 bg-success py-2 text-light d-flex justify-content-center align-items-center rounded"> 
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-check-circle" viewBox="0 0 16 16">
                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                                <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                                </svg>
                                <span className="font-weight-bold ml-2">
                                    { (isMobile)? "Tramite enviado con exito..." :"Datos del tramite enviados con exito..." }
                                </span>
                            </div>
                        }
                    </form>
                </article>
                <article className="text-center col">
                    <h5>Herramientas</h5>
                    <div className="row">
                        {
                            icons.map((icon,index) => {
                                return (
                                    <div key={index} draggable onDragStart={(e) => start_drag(e,index)} className={(isMobile)? "col-3 mb-3" : "col-sm-6 mb-4"}>
                                        <div className="card btn p-0 border border-primary">
                                            <div>{icon.icon}</div>
                                            <p className="card-text">{icon.name}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <span className="text-muted">
                        <i>Seleccione con un click</i>
                    </span>
                </article>
            </section>
        </section>
    )
}