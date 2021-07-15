import React from "react";
import "devextreme/dist/css/dx.light.css";
import * as Api from "../Api.js";
import DataGrid, {Editing, Column, Button, OperationDescriptions, Paging, RequiredRule, Pager, Popup, Form, Lookup} from "devextreme-react/data-grid";
import {Item} from "devextreme-react/form";
import CustomStore from "devextreme/data/custom_store";
import SelectBox from "devextreme-react/select-box";
import {useState, useEffect} from "react";
import {FilterRow} from "devextreme-react/tree-list";

const TablaActividades2 = () => {
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
            .then((data) => {
                setDependencias(data);
                console.log(data);
                console.log("Dependencias", dependencias);
            })
            .catch((error) => {
                console.err(error);
            });
    }, [data]);

    return (
        <div>
            <DataGrid id="dataGrid" refresh={true} dataSource={data} allowColumnReordering={true} allowColumnResizing={true} columnAutoWidth={false} showBorders={true}>
                <Paging enabled={true} defaultPageSize={10} />
                <Pager enabled={true} showNavigationButtons={true} showInfo={true} />
                <FilterRow visible={true} resetOperationText="Deshacer filtros">
                    <OperationDescriptions contains="Contiene" equal="Busqueda Exacta" />
                </FilterRow>
                <Editing mode="popup" useIcons={true} allowAdding={true} allowUpdating={true} allowDeleting={true}>
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
                    <Button name="edit" hint="Editar" />
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
