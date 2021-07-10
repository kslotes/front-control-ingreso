import React from "react";
import "devextreme/dist/css/dx.light.css";
import * as Api from "../Api.js";
import DataGrid, {Editing, Column, Button, OperationDescriptions, Paging, RequiredRule, Popup, Form} from "devextreme-react/data-grid";
import {Item, SimpleItem} from "devextreme-react/form";
import CustomStore from "devextreme/data/custom_store";
import {useState, useEffect} from "react";
import {FilterRow} from "devextreme-react/tree-list";

const TablaActividades2 = () => {

    const [dependencias, setDependencias] = useState([]);

    const data = new CustomStore({
        key: "idActividad",
        load: () => Api.getActividades(),
        update: (key, values) => {
            Api.updateActividad(key, values);
        },
        remove: (key) => {
            Api.borrarActividad(key);
        },
    });

    const filtros = ["contains", "="];

    const columnas = [
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

    useEffect(() => {

        // Get all Dependencias from API
        Api.getDependencias()
            .then(data => {
                setDependencias(data);
                console.log(data);
            }).catch(error => {
                console.err(error);
            })
    }, [])

    return (
        <div>
            <DataGrid id="dataGrid" refresh={true} dataSource={data} allowColumnReordering={true} allowColumnResizing={true} columnAutoWidth={true} showBorders={true}>
                <Paging enabled={true} defaultPageSize={10} />
                <FilterRow visible={true} resetOperationText="Deshacer filtros">
                    <OperationDescriptions contains="Contiene" equal="Busqueda Exacta" />
                </FilterRow>
                <Editing mode="popup" useIcons={true} allowAdding={true} allowUpdating={true} allowDeleting={true}>
                    <Popup closeOnOutsideClick={true}  title="Datos de Actividad" showTitle={true} width={600} height={300} />
                    <Form>
                        <Item itemType="group" colCount={1} colSpan={2}>
                            <Item dataField="nombreActividad" required={true} />
                            <Item dataField="nombreDependencia" editorType="dxSelectBox" editorOptions={{items: dependencias}} required={true}/>
                            <Item dataField="nombrePropuesta" required={true} />
                        </Item>
                    </Form>
                </Editing>
                <Column type="buttons" caption="Acciones">
                    <Button name="edit" hint="Editar" />
                    <Button name="delete" hint="Borrar" />
                </Column>
                {columnas.map((c) => (
                    <Column dataField={c.dataField} caption={c.caption} width={c.width} filterOperations={filtros}>
                        <RequiredRule message={`${c.caption} es un campo obligatorio.`} />
                    </Column>
                ))}
            </DataGrid>
        </div>
    );
};

export default TablaActividades2;
