/**
{
"descripcion":{
"titulo": "ejemplo2",
      "proyecto": 99,
      "indicador": 888,
 "agente":98,
      "dias": 2,
      "page": {
"Fecha de Incidente":"09/09/2023",
"Comentario": "tjsjajsj",
"Cantiadades": 98,
"Legajo": 0,
"Clave de acceso": "password",
"Tipo de Estudiante": ["Ingresante", "Libre", "Regular", "graduado"],
"Completo Secundario": true,
"Materias": {"Nombre":"", "Comision":"", "Cuatrimestre":""}
},
      "aux": ""

} ,
 "categoria_id_categoria": 3,
      "tipo_usuario_tipo": 1,
      "especialidad_id_especialidad": 5
} 
 **/

// "tabla": {titulo:"",categoria:""}


/*
    Nombre  Comision  Cuatrimetre
    arq       1k7        2do
    dis       1k8        1do
*/

import { useState, Fragment } from "react";
import { useMediaQuery } from "react-responsive"
import { useForm } from 'react-hook-form';
import { useReducer } from "react";

//import axios from 'axios';

export default function ComponentCrudTramites() {
    const isTablet = useMediaQuery({ query: '(max-width: 991px)' })
    const isMobile = useMediaQuery({ query: "(max-width: 675px)" });

    const [send_datos, setSend_datos] = useState(false);
    const [view_modal_form, setView_modal_form] = useState(false);
    const [view_modal_page, setView_modal_page] = useState(false);
    const [active_style_description, setActive_style_description] = useState(false);
    const [confirmation_edit, setConfirmation_edit] = useState(null);
    const [confirmation_delete, setConfirmation_delete] = useState(null);
    const [confirmation_search, setConfirmation_search] = useState(true);
    const [capture_icon_setting, setCapture_icon_setting] = useState({});
    const [capture_name_setting, setCapture_name_setting] = useState("");
    const [capture_option_setting, setCapture_option_setting] = useState("");
    const [capture_options_setting, setCapture_options_setting] = useState([]);
    const [capture_rows_setting, setCapture_rows_setting] = useState([1]);
    const [list_icons_add, setList_icons_add] = useState([]);
    const [list_tramites, setList_tramites] = useState([]);
    const { register, formState: { errors }, handleSubmit, clearErrors, reset } = useForm();

    const [any, forceUpdate] = useReducer(prev => prev + 1, 0);

    const search_tramite = (e) => {
        setConfirmation_delete(null);
        setConfirmation_edit(null);
        setSend_datos(false);
        if (e.target.value === "") {
            setConfirmation_search(true);
            //const result = await axios.get("url"); //Obtener todos los tramites
            //setList_tramites(result);
        } else {
            if (!(/^([ a-zA-Záéíóú1-9]{1,60})(\s[a-zA-Z]+)*$/i).test(e.target.value)) {
                setConfirmation_search(undefined);
                //setList_tramites([]); //Limpiar
            } else {
                //const result = await axios.get("url",e.target.value); //Buscar el tramite
                //setList_tramites(result);
                setConfirmation_search(false);
            }
        }
        setList_tramites(list_tramites.filter((tramite, index) => index == e.target.value));
    }
    const delete_tramite = () => {
        //const result = await axios.delete("");
        setConfirmation_delete(undefined);
        //const result = await axios.get(""); //Actualizar tramites
        //setList_tramites(result);
    }
    const edit_tramite = (data) => {
        //const result = await axios.put("");
        setConfirmation_edit(undefined);
        close_form();
        setSend_datos(true);
        //const result = await axios.get(""); //Actualizar tramites
        //setList_tramites(result);
    }
    const push_tramite = (data) => {
        setConfirmation_edit(null);
        close_form();
        setSend_datos(true);
        //const result = await axios.push("");
        setList_tramites((prev) => [...prev, data]);
        //const result = await axios.get(""); //Actualizar tramites
        //setList_tramites(result);
    }
    const close_form = () => {
        reset_form();
        setView_modal_form(false);
    }
    const view_form = () => {
        clearErrors();
        setList_icons_add([]);
        setConfirmation_edit(null);
        setView_modal_form(true);
        reset_form();
    }
    const view_message_delete = (index) => {
        setConfirmation_delete(index);
        setSend_datos(false);
    }
    const edit_form = (index) => {
        reset({
            title: list_tramites[index]?.title,
            project: list_tramites[index]?.project,
            indicator: list_tramites[index]?.indicator,
            agent: list_tramites[index]?.agent,
            days: list_tramites[index]?.days,
            aux: list_tramites[index]?.aux,
            legajo: list_tramites[index]?.legajo,
            clave_sysacad: list_tramites[index]?.clave_sysacad,
            category: list_tramites[index]?.category,
            user_type: list_tramites[index]?.user_type,
            specialty: list_tramites[index]?.specialty
        })
        setList_icons_add(["2", "6"]);
        setConfirmation_edit(index);
        setView_modal_form(true);
    }
    const reset_form = () => {
        reset({
            title: '',
            project: '',
            indicator: '',
            agent: '',
            days: '',
            aux: '',
            legajo: '',
            clave_sysacad: '',
            category: '',
            user_type: '',
            specialty: ''
        })
    }
    const message_dragdrop = () => {
        return {
            opacity: "0.4",
            fontSize: (isMobile) ? "37px" : "55px",
            transform: "translateY(40px)"
        }
    }
    const style_inputs = (input) => {
        return (input?.type === "required" || input?.type === "maxLength" || input?.type === "minLength" || input?.type === "min" || input?.type === "pattern") ? "form-control shadow-none border-danger" : "form-control shadow-none border-primary";
    }
    const message_inputs = (input, name) => {
        return <span style={(input?.type !== "required" && input?.type !== "maxLength" && input?.type !== "minLength" && input?.type !== "min" && input?.type !== "pattern") ? {} : { color: "red" }}>
            {
                (input?.type === "required") ? (name === "Dias") ? "Los dias son requeridos" : (name === "Clave sysacad") ? "La clave sysacad es requerida" : "El " + name.toLowerCase() + " es requerido" :
                    (input?.type === "min") ? (name === "Dias") ? "Los dias deben tener un minimo de 0" : "El " + name.toLowerCase() + " debe tener un minimo 0" :
                        (input?.type === "pattern") ? (name === "Auxiliar") ? "La url no es valida" : "El " + name.toLowerCase() + " solo permite letras" :
                            (input?.type === "maxLength") ? "El " + name.toLowerCase() + " debe tener menos de 140 caracteres" :
                                (input?.type === "minLength") ? "El " + name.toLowerCase() + " debe tener un minimo de 5 caracteres" : name
            }
        </span>
    }
    const message_dropdown = (input, name) => {
        return <span style={(input?.type !== "required") ? {} : { color: "red" }}>
            {
                (input?.type === "required") ? (name === "Categoria" || name === "Especialidad") ? "La " + name.toLowerCase() + " es requerida" : "El tipo de usuario es requerido" : ""
            }
        </span>
    }
    const start_drag = (e, item) => {
        e.dataTransfer.setData("item_id", item + 1);
    }
    const dragging_over = (e) => {
        setActive_style_description(true);
        e.preventDefault();
    }
    const on_drop = (e) => {
        setView_modal_page(true);
        reset_setting();
        setActive_style_description(false);
        const id = e.dataTransfer.getData("item_id");
        setCapture_icon_setting({ id });
    }
    const remove_input = (name) => {
        setList_icons_add(list_icons_add.filter(icon => icon.name != name));
    }
    const remove_icon = () => {
        setView_modal_page(false);
        reset_setting();
    }
    const reset_setting = () => {
        setCapture_name_setting("");
        setCapture_option_setting("");
        setCapture_options_setting([]);
        setCapture_icon_setting({});
    }
    const add_icon = () => {
        setView_modal_page(false);
        if (list_icons_add.find(icon => icon.name === capture_name_setting) === undefined) {
            setList_icons_add((prev) => [...prev, {
                id: capture_icon_setting.id,
                name: capture_name_setting,
                options: capture_options_setting,
                table: [get_column_table()]
            }]);
        }
    }
    const add_option = () => {
        if (!capture_options_setting.includes(capture_option_setting)) {
            setCapture_options_setting((prev) => [...prev, capture_option_setting]);
        }
        setCapture_option_setting("");
    }
    const remove_option = (option) => {
        setCapture_options_setting(capture_options_setting.filter(prev => prev != option));
    }
    const get_column_table = () => {
        let column = {};
        capture_options_setting.map((option) => column[option] = "");
        return column;
    }
    const rows_table = (key, index, action) => {
        let list = list_icons_add;
        if (action === "+") {
            list[key].table.push(get_column_table());
            setList_icons_add(list);
        }
        if (action === "-") {
            if(list[key].table.length == 1){
                setList_icons_add(list_icons_add.filter(prev => prev != list_icons_add[key]));
            }else{
                list[key].table = list[key].table.filter(row => row !== list[key].table[index]);
                setList_icons_add(list);
            }
        }
        forceUpdate();
    }
    const capture_value_table = (row,key,e) => {
        row[key] = e.target.value
        forceUpdate();
    }
    const search_setting = (icon) => {
        switch (icon.id) {
            case "3":
                return <>
                    <div className="pt-3">
                        <span className="text-primary font-weight-bold">Calumnas</span>
                        <div className="d-flex my-2">
                            <input type="text" value={capture_option_setting} className="form-control shadow-none border-primary" onChange={(e) => setCapture_option_setting(e.target.value)} placeholder="Columna..." />
                            <button onClick={() => add_option()} type="button" className="ml-1 btn btn-primary border-0 pt-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                                </svg>
                            </button>
                        </div>
                        <div className="col border border-primary py-2 px-2">
                            <p className="text-primary font-weight-bold">Tabla</p>
                            {(capture_options_setting.length != 0) &&
                                <table className="table table-bordered table-hover">
                                    <thead className="thead text-white" style={{ backgroundColor: "black" }}>
                                        <tr>
                                            {
                                                capture_options_setting.map((column, index) => {
                                                    return <th key={index} scope="col" className="py-1">
                                                        <div className="d-flex justify-content-between">
                                                            <span>{column}</span>
                                                            <button className="border-0 p-0 bg-transparent" type="button" onClick={() => remove_option(column)}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill="currentColor" className="bi bi-x text-danger" viewBox="0 0 16 16">
                                                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </th>
                                                })
                                            }
                                        </tr>
                                    </thead>
                                </table>
                            }
                        </div>
                    </div>
                </>
            case "7":
                return <>
                    <div className="pt-3">
                        <span className="text-primary font-weight-bold">Opciones</span>
                        <div className="d-flex my-2">
                            <input type="text" value={capture_option_setting} className="form-control shadow-none border-primary" onChange={(e) => setCapture_option_setting(e.target.value)} placeholder="Opcion..." />
                            <button onClick={() => add_option()} type="button" className="ml-1 btn btn-primary border-0 pt-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                                </svg>
                            </button>
                        </div>
                        <div className="col border border-primary py-2 px-2">
                            <p className="text-primary font-weight-bold">Lista de opciones</p>
                            {
                                capture_options_setting.map((option, index) => {
                                    return <p key={index} className="d-flex justify-content-between border border-primary rounded">
                                        <span className="px-2 py-1">{option}</span>
                                        <button className="border-0 p-0 bg-transparent mr-1" type="button" onClick={() => remove_option(option)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-x text-danger" viewBox="0 0 16 16">
                                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                            </svg>
                                        </button>
                                    </p>
                                })
                            }
                        </div>
                    </div>
                </>
        }
    }
    const search_icon = (icon, key) => {
        switch (icon.id) {
            case "1": case "2": case "4": case "6":
                return <>
                    <div className="d-flex justify-content-between">
                        <label htmlFor={"input-" + icon.name}>
                            {icon.name}
                        </label>
                        <button className="border-0 p-0 bg-transparent" type="button" onClick={() => remove_input(icon.name)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-x text-danger" viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                            </svg>
                        </button>
                    </div>
                    <input type={(icon.id === "1") ? "text" : (icon.id === "2" ? "number" : (icon.id === "4") ? "date" : "password")} className="form-control shadow-none border-primary" id={"input-" + icon.name} placeholder={icon.name + "..."} />
                </>
            case "3":
                return <>
                    <div className="d-flex justify-content-between">
                        <label htmlFor={"input-" + icon.name}>
                            {icon.name}
                        </label>
                        <button className="border-0 p-0 bg-transparent" type="button" onClick={() => remove_input(icon.name)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-x text-danger" viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                            </svg>
                        </button>
                    </div>
                    <table className="table table-bordered table-hover">
                        <thead className="thead text-white" style={{ backgroundColor: "black" }}>
                            <tr>
                                {
                                    Object.keys(icon.table[0]).map(key => {
                                        return <th key={key} className="py-1">{key}</th>
                                    })
                                }
                                <th className="py-1 text-center">
                                    <svg onClick={() => rows_table(key, 0, "+")} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-plus-circle-fill text-primary" style={{ cursor: "pointer" }} viewBox="0 0 16 16">
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                                    </svg>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                icon.table.map((row, id) => {
                                    return <tr key={id}>
                                        {
                                            Object.keys(row).map((key, index) => {
                                                return <td key={index} className="text-center">
                                                    <input type="text" value={row[key]} onChange={(e) => capture_value_table(row,key,e)} className="form-control shadow-none border-primary" placeholder={key + "..."} />
                                                </td>
                                            })
                                        }
                                        <td className="text-center pt-3">
                                            <svg onClick={() => rows_table(key, id, "-")} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x-circle-fill text-danger ml-1" style={{ cursor: "pointer" }} viewBox="0 0 16 16">
                                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                                            </svg>
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </>
            case "5": case "7":
                return <>
                    <div className="d-flex justify-content-between">
                        <label htmlFor={"input-" + icon.name}>
                            {(icon.id === "5") ? "¿" + icon.name + "?" : icon.name}
                        </label>
                        <button className="border-0 p-0 bg-transparent" type="button" onClick={() => remove_input(icon.name)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-x text-danger" viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                            </svg>
                        </button>
                    </div>
                    {
                        (icon.id === "5") &&
                        <select className="form-control shadow-none border-primary">
                            <option value="">Seleccionar respuesta...</option>
                            <option value={true}>Si</option>
                            <option value={false}>No</option>
                        </select>
                    }
                    {
                        (icon.id === "7") &&
                        <select className="form-control shadow-none border-primary">
                            <option value="">Seleccionar {icon.name.toLowerCase()}...</option>
                            {
                                icon.options.map((option, index) => {
                                    return <option key={index} value={option}>{option}</option>
                                })
                            }
                        </select>
                    }
                </>
        }
    }

    const icons = [
        {
            name: "Text",
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-body-text" viewBox="0 0 16 16"><path fillRule="evenodd" d="M0 .5A.5.5 0 0 1 .5 0h4a.5.5 0 0 1 0 1h-4A.5.5 0 0 1 0 .5Zm0 2A.5.5 0 0 1 .5 2h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5Zm9 0a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5Zm-9 2A.5.5 0 0 1 .5 4h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5Zm5 0a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5Zm7 0a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5Zm-12 2A.5.5 0 0 1 .5 6h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5Zm8 0a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5Zm-8 2A.5.5 0 0 1 .5 8h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5Zm7 0a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5Zm-7 2a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1h-8a.5.5 0 0 1-.5-.5Zm0 2a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5Zm0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Z" /></svg>
        },
        {
            name: "Num",
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-123" viewBox="0 0 16 16"><path d="M2.873 11.297V4.142H1.699L0 5.379v1.137l1.64-1.18h.06v5.961h1.174Zm3.213-5.09v-.063c0-.618.44-1.169 1.196-1.169.676 0 1.174.44 1.174 1.106 0 .624-.42 1.101-.807 1.526L4.99 10.553v.744h4.78v-.99H6.643v-.069L8.41 8.252c.65-.724 1.237-1.332 1.237-2.27C9.646 4.849 8.723 4 7.308 4c-1.573 0-2.36 1.064-2.36 2.15v.057h1.138Zm6.559 1.883h.786c.823 0 1.374.481 1.379 1.179.01.707-.55 1.216-1.421 1.21-.77-.005-1.326-.419-1.379-.953h-1.095c.042 1.053.938 1.918 2.464 1.918 1.478 0 2.642-.839 2.62-2.144-.02-1.143-.922-1.651-1.551-1.714v-.063c.535-.09 1.347-.66 1.326-1.678-.026-1.053-.933-1.855-2.359-1.845-1.5.005-2.317.88-2.348 1.898h1.116c.032-.498.498-.944 1.206-.944.703 0 1.206.435 1.206 1.07.005.64-.504 1.106-1.2 1.106h-.75v.96Z" /></svg>
        },
        {
            name: "Table",
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-table" viewBox="0 0 16 16"><path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm15 2h-4v3h4V4zm0 4h-4v3h4V8zm0 4h-4v3h3a1 1 0 0 0 1-1v-2zm-5 3v-3H6v3h4zm-5 0v-3H1v2a1 1 0 0 0 1 1h3zm-4-4h4V8H1v3zm0-4h4V4H1v3zm5-3v3h4V4H6zm4 4H6v3h4V8z" /></svg>
        },
        {
            name: "Date",
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-calendar" viewBox="0 0 16 16"><path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" /></svg>
        },
        {
            name: "Bool",
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-lightbulb" viewBox="0 0 16 16"><path d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13a.5.5 0 0 1 0 1 .5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1 0-1 .5.5 0 0 1 0-1 .5.5 0 0 1-.46-.302l-.761-1.77a1.964 1.964 0 0 0-.453-.618A5.984 5.984 0 0 1 2 6zm6-5a5 5 0 0 0-3.479 8.592c.263.254.514.564.676.941L5.83 12h4.342l.632-1.467c.162-.377.413-.687.676-.941A5 5 0 0 0 8 1z" /></svg>
        },
        {
            name: "Pass",
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-key" viewBox="0 0 16 16"><path d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8zm4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5z" /><path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" /></svg>
        },
        {
            name: "Select",
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-card-checklist" viewBox="0 0 16 16"><path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z" /><path d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0zM7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z" /></svg>
        }
    ]

    return (
        <Fragment>
            <section style={(view_modal_form) ? { display: "none" } : { display: "block" }} className="container pt-5 pb-4">
                <article className="text-center mb-3">
                    {(isMobile) ? <h4 className="text-primary font-weight-bold">TRAMITES</h4> : <h1 className="text-primary font-weight-bold">TRAMITES</h1>}
                </article>
                <article className="w-100 py-2 d-flex justify-content-between">
                    <button onClick={() => view_form()} className="btn btn-primary rounded d-flex justify-content-center align-items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                        </svg>
                        {(!isMobile) && <span className="ml-2 font-weight-bold">Nuevo tramite</span>}
                    </button>
                    <div className={(isMobile) ? "w-75" : "w-50"}>
                        <input onChange={(e) => search_tramite(e)} className="w-100 mr-1 p-2 form-control shadow-none border-primary" type="text" placeholder="Buscar tramite..." />
                    </div>
                </article>
                {(confirmation_delete != null) &&
                    <article className={(isMobile) ? "mt-2 mb-1 border border-danger pt-3 text-white text-center rounded" : "mt-2 mb-1 border border-danger pt-3 text-white d-flex justify-content-between rounded"}>
                        <p className="pl-3 pr-2 text-danger font-weight-bold">¿Esta seguro que desea eliminar el tramite {confirmation_delete}?</p>
                        <div className={(isMobile) ? "px-2 text-center pb-3" : "px-2 text-right"}>
                            <button onClick={() => delete_tramite()} className="border-0 btn-primary mx-2 text-center">&nbsp;SI&nbsp;&nbsp;</button>
                            <button onClick={() => setConfirmation_delete(null)} className="border-0 btn-danger mx-2 text-center">NO</button>
                        </div>
                    </article>
                }
                {(!confirmation_search || confirmation_search === undefined) &&
                    <article className="mt-2 mb-1 border border-danger pt-3 pr-3 rounded d-flex justify-content-between">
                        <p className="pl-3 text-danger font-weight-bold">
                            {(confirmation_search !== undefined) ? "No se encontraron resultados para su busqueda..." : "Solo se permiten letras y numeros positivos con un maximo de 60 caracteres..."}
                        </p>
                        <div>😕</div>
                    </article>
                }
                {(confirmation_delete === undefined) &&
                    <article className="mt-2 mb-1 border border-success pt-3 pr-3 rounded d-flex justify-content-between">
                        <p className="pl-3 text-success font-weight-bold">Tramite {confirmation_delete} eliminado con exito...</p>
                        <div>😃</div>
                    </article>
                }
                {(send_datos) &&
                    <article className="mt-2 mb-1 border border-success pt-3 pr-3 rounded d-flex justify-content-between">
                        <p className="pl-3 text-success font-weight-bold">
                            {(confirmation_edit === undefined) ? "Tramite actualizado con exito..." : "Tramite creado con exito..."}
                        </p>
                        <div>😁</div>
                    </article>
                }
                <article className="table-responsive">
                    <table className="table table-bordered table-hover">
                        <thead className="thead text-white" style={{ backgroundColor: "black" }}>
                            <tr>
                                <th className="text-center" scope="col">Titulo</th>
                                <th className="text-center" scope="col">Categoria</th>
                                <th className="text-center" scope="col" style={{ color: "black" }}>xxxxxx</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                list_tramites.map((tramite, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className="text-center">{tramite.title}</td>
                                            <td className="text-center">{tramite.category}</td>
                                            <td className="px-0 text-center">
                                                <button onClick={() => edit_form(index)} className="border-0 pb-1 rounded bg-primary mx-1">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil text-white" viewBox="0 0 16 16">
                                                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                                    </svg>
                                                </button>
                                                <button onClick={() => view_message_delete(index)} className="border-0 pb-1 rounded bg-danger mx-1">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash text-white" viewBox="0 0 16 16">
                                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                                    </svg>
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </article>
            </section>
            <section style={(view_modal_form) ? { display: "block" } : { display: "none" }} className="container pt-5 pb-4">
                {(!isMobile && !isTablet) &&
                    <button onClick={() => close_form()} className="btn btn-primary mt-1 position-absolute">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
                            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
                        </svg>
                    </button>
                }
                <section className="text-center">
                    {(isMobile) ? <h4 className="text-primary font-weight-bold">FORMULARIO TRAMITES</h4> : <h1 className="text-primary font-weight-bold">FORMULARIO TRAMITES</h1>}
                </section>
                <section className="row py-3 d-flex">
                    <article className={(isTablet) ? "col-12 order-2 mt-3" : "col-10"}>
                        <form method="POST" action="" onSubmit={handleSubmit((confirmation_edit == null) ? push_tramite : edit_tramite)}>
                            <div className="form-group">
                                <label htmlFor="input-title">
                                    {message_inputs(errors.title, "Titulo")}
                                </label>
                                <input type="text" className={style_inputs(errors.title)} id="input-title" {...register('title', {
                                    required: true,
                                    minLength: 5,
                                    maxLength: 140,
                                    pattern: /^([a-zA-Záéíóú]+)(\s[a-zA-Z]+)*$/i
                                })} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="input-project">
                                    {message_inputs(errors.project, "Proyecto")}
                                </label>
                                <input type="number" className={style_inputs(errors.project)} id="input-project" {...register('project', {
                                    required: true,
                                    min: 0
                                })} />
                            </div>
                            <div className="row">
                                <div className="col form-group">
                                    <label htmlFor="input-indicator">
                                        {message_inputs(errors.indicator, "Indicador")}
                                    </label>
                                    <input type="number" className={style_inputs(errors.indicator)} id="input-indicator" {...register('indicator', {
                                        required: true,
                                        min: 0
                                    })} />
                                </div>
                                <div className="col form-group">
                                    <label htmlFor="input-agent">
                                        {message_inputs(errors.agent, "Agente")}
                                    </label>
                                    <input type="number" className={style_inputs(errors.agent)} id="input-agent" {...register('agent', {
                                        required: true,
                                        min: 0
                                    })} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col form-group">
                                    <label htmlFor="input-days">
                                        {message_inputs(errors.days, "Dias")}
                                    </label>
                                    <input type="number" className={style_inputs(errors.days)} id="input-days" {...register('days', {
                                        required: true,
                                        min: 0
                                    })} />
                                </div>
                                <div className="col form-group">
                                    <label htmlFor="input-aux">
                                        {message_inputs(errors.aux, "Auxiliar")}
                                    </label>
                                    <input type="text" className={style_inputs(errors.aux)} id="input-aux" {...register('aux', {
                                        pattern: /https?:\/\/[\w\-\.]+\.\w{2,5}\/?\$*/i
                                    })} />
                                </div>
                            </div>
                            <div className="form-group mb-3">
                                <label>Pagina</label>
                                <div onDrop={(e) => on_drop(e)} droppable="true" onDragOver={(e) => dragging_over(e)} className={(active_style_description) ? "position-relative border border-danger rounded p-3" : "position-relative border border-primary rounded p-3"} style={{ height: (list_icons_add.length == 0 && !view_modal_page) ? "200px" : "auto" }}>
                                    {
                                        view_modal_page &&
                                        <div className="border border-primary rounded p-2 w-100 text-center mb-3">
                                            <span className="text-primary font-weight-bold">Configuracion</span>
                                            <div className="py-3">
                                                <input type="text" className="form-control shadow-none border-primary" onChange={(e) => setCapture_name_setting(e.target.value)} value={capture_name_setting} placeholder="Nombre..." />
                                                {search_setting(capture_icon_setting)}
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <button onClick={() => remove_icon()} type="button" className="btn btn-danger rounded d-flex align-items-center px-2 py-1">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                                    </svg>
                                                    <span className="ml-1 font-weight-bold">Deshacer</span>
                                                </button>
                                                <button onClick={() => add_icon()} type="button" className="btn btn-primary rounded d-flex align-items-center px-4 py-1">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-circle" viewBox="0 0 16 16">
                                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                                        <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
                                                    </svg>
                                                    <span className="ml-1 font-weight-bold">Listo</span>
                                                </button>
                                            </div>
                                        </div>
                                    }
                                    {(!view_modal_page && list_icons_add.length == 0) && <div className="w-100 text-center text-secondary" style={message_dragdrop()}>Arrastrar y soltar</div>}
                                    {
                                        list_icons_add.map((icon, index) => {
                                            return <div key={index} className="mb-3">{search_icon(icon, index)}</div>
                                        })
                                    }
                                </div>
                            </div>
                            <label className="mt-0">
                                {message_dropdown(errors.category, "Categoria")}
                            </label>
                            <select className={style_inputs(errors.category)} {...register('category', { required: true })}>
                                <option value="">Seleccionar categoria...</option>
                                <option value="Name 1">Name 1</option>
                                <option value="Name 2">Name 2</option>
                            </select>
                            <label className="mt-3">
                                {message_dropdown(errors.user_type, "Tipo de usuario")}
                            </label>
                            <select className={style_inputs(errors.user_type)} {...register('user_type', { required: true })}>
                                <option value="">Seleccionar tipo usuario...</option>
                                <option value="Name 1">Name 1</option>
                                <option value="Name 2">Name 2</option>
                            </select>
                            <label className="mt-3">
                                {message_dropdown(errors.specialty, "Especialidad")}
                            </label>
                            <select className={style_inputs(errors.specialty)} {...register('specialty', { required: true })}>
                                <option value="">Seleccionar especialidad...</option>
                                <option value="Name 1">Name 1</option>
                                <option value="Name 2">Name 2</option>
                            </select>
                            <div className={(isMobile) ? "row px-3 pt-4" : "row px-3 pt-5"}>
                                <button onClick={() => close_form()} type="button" className={(isMobile) ? "mr-1 col btn btn-danger d-flex justify-content-center align-items-center" : "mr-5 col btn btn-danger d-flex justify-content-center align-items-center"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                    </svg>
                                    <span className="mx-2 font-weight-bold">Cancelar</span>
                                </button>
                                <button type="submit" className={(isMobile) ? "ml-1 col btn btn-primary d-flex justify-content-center align-items-center" : "ml-5 col btn btn-primary d-flex justify-content-center align-items-center"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-check-circle" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                        <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
                                    </svg>
                                    <span className="mx-2 font-weight-bold">
                                        {(confirmation_edit != null) ? "Actualizar" : "Aceptar"}
                                    </span>
                                </button>
                            </div>
                        </form>
                    </article>
                    <article className="text-center col">
                        <h5>Herramientas</h5>
                        <div className="row">
                            {
                                icons.map((icon, index) => {
                                    return (
                                        <div key={index} draggable onDragStart={(e) => start_drag(e, index)} className={(isMobile) ? "col-3 mb-3" : "col-sm-6 mb-4"}>
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
        </Fragment>
    )
}