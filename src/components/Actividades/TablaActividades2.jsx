import React from "react";
import "devextreme/dist/css/dx.light.css";
import * as Api from "../Api.js";
import DataGrid, {Editing, Column, Button, OperationDescriptions, Paging, RequiredRule, Pager, Popup, Lookup} from "devextreme-react/data-grid";
import {Modal, Form} from "react-bootstrap";
import {Item} from "devextreme-react/form";
import CustomStore from "devextreme/data/custom_store";
import SelectBox from "devextreme-react/select-box";
import {useState, useEffect} from "react";
import {FilterRow} from "devextreme-react/tree-list";
import {ModificarActividad} from "./ModificarActividad";
import NuevaActividad from "./NuevaActividad";

const TablaActividades2 = () => {
    const [showModalModificar, setshowModalModificar] = useState(false);
    const [showModalAgregar, setShowModalAgregar] = useState(false);
    const [actividad, setActividad] = useState();

    const handleCloseModificar = () => setshowModalModificar(false);
    const handleHideModificar = () => setshowModalModificar(false);
    const handleCloseAgregar = () => setShowModalAgregar(false);
    const handleHideAgregar = () => setShowModalAgregar(false);
    
    const handleEditarClick = (data) => {
        console.log(data);
        setActividad(data);
        setshowModalModificar(!showModalModificar);
    };
    const handleAgregarClick = () => {
        setShowModalAgregar(!showModalAgregar);
        console.log(`Agregar clicked`);
    };

    const [dependencias, setDependencias] = useState([]);
    const [data] = useState(
        new CustomStore({
            key: "idActividad",
            insert: (values) => {
                Api.crearActividad(values);
                console.log(values);
            },
            load: () => {
                console.log(Api.getActividades());
                return Api.getActividades();
            },
            update: (key, values) => {
                console.log(key, values);
                Api.updateActividad(key, values);
            },
            remove: (key) => {
                Api.borrarActividad(key);
            },
        })
    );

    const filtros = ["contains", "="];

    const columnas = [
        {
            dataField: "idActividad",
            width: "10%",
            caption: "id",
        },
        {
            dataField: "nombreActividad",
            width: 200,
            caption: "Actividad",
        },
        {
            dataField: "nombreDependencia",
            width: 400,
            caption: "Dependencia",
        },
        {
            dataField: "nombrePropuesta",
            width: 300,
            caption: "Propuesta",
        },
    ];

    const onToolbarPreparing = (e) => {
        let toolbarItems = e.toolbarOptions.items;
        // Modifies an existing item
        toolbarItems.forEach(function (item) {
            if (item.name === "addRowButton") {
                item.options = {
                    icon: "add",
                    hint: "Agregar",
                    onClick: handleAgregarClick,
                };
            }
        });
    };
    useEffect(() => {
        // Get all Dependencias from API
        Api.getDependencias()
            .then((data) => {
                setDependencias(data);
                console.log("Dependencias", dependencias);
            })
            .catch((error) => {
                console.err(error);
            });
    }, [data]);

    return (
        <div>
            <NuevaActividad showModal={showModalAgregar} handleClose={handleCloseAgregar} handleHide={handleHideAgregar} />
            {actividad ? <ModificarActividad actividad={actividad} showModal={showModalModificar} handleClose={handleCloseModificar} handleHide={handleHideModificar} /> : null}
            <DataGrid
                id="dataGrid"
                onToolbarPreparing={onToolbarPreparing}
                refresh={true}
                dataSource={data}
                allowColumnReordering={true}
                allowColumnResizing={true}
                columnAutoWidth={false}
                showBorders={true}
            >
                <Paging enabled={true} defaultPageSize={10} />
                <Pager enabled={true} showNavigationButtons={true} showInfo={true} />
                <FilterRow visible={true} resetOperationText="Deshacer filtros">
                    <OperationDescriptions contains="Contiene" equal="Busqueda Exacta" />
                </FilterRow>
                <Editing useIcons={true} allowAdding={true} allowUpdating={true} allowDeleting={true}>
                    <Button name="add" hint="Agregar" onClick={() => console.log("Clicked")} />
                    <Popup closeOnOutsideClick={true} title="Datos de Actividad" showTitle={true} width={600} height={300} />
                    <Form>
                        <Item itemType="group" colCount={1} colSpan={2}>
                            <Item dataField="nombreActividad" required={true} />
                            <Item dataField="nombreDependencia" required={true} />
                            <Item dataField="nombrePropuesta" required={true} />
                        </Item>
                    </Form>
                </Editing>
                <Column type="buttons" caption="Acciones">
                    <Button name="edit" hint="Editar" onClick={(event) => handleEditarClick(event.row.data)} />
                    <Button name="delete" hint="Borrar" />
                </Column>
                {columnas.map((c) => {
                    return (
                        <Column dataField={c.dataField} caption={c.caption} width={c.width} filterOperations={filtros}>
                            <RequiredRule message={`${c.caption} es un campo obligatorio.`} />
                        </Column>
                    );
                })}
            </DataGrid>
        </div>
    );
};

export default TablaActividades2;
