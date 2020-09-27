import React from 'react';
import {Button, Form, Container} from 'semantic-ui-react';
import FormItem from "./FormItem";

class MyForm extends React.Component {
    itemsData;

    constructor(props) {
        super(props);
        this.state = {
            formTable: [
                {
                    id: 1,
                    name: undefined,
                    quantity: undefined,
                    netPrice: undefined,
                    tax: undefined,
                    grossPrice: undefined,
                }
            ],
            disabled: true
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }


    handleChange = (e, id) => {
        const array = this.state.formTable;
        for (let i = 0; i < array.length; i++) {
            if (array[i].id === id) {
                array[i][e.target.name] = e.target.value;
                if (array[i].quantity && array[i].netPrice && array[i].tax) {
                    array[i].grossPrice = Number(array[i].quantity) * (Number(array[i].netPrice) + Number(array[i].netPrice) * Number(array[i].tax))
                }
            }
            if (!array[i].name || !array[i].quantity || !array[i].netPrice || !array[i].tax) {
                this.setState({disabled: true});
            }
            else {
                this.setState({disabled: false});
            }
        }
        this.setState({formTable: array});
    };


    handleSelectChange = (e, value, id) => {
        const array = this.state.formTable;
        for (let i = 0; i < array.length; i++) {
            if (array[i].id === id) {
                array[i].tax = value;
                if (array[i].quantity && array[i].netPrice && array[i].tax) {
                    array[i].grossPrice = Number(array[i].quantity) * (Number(array[i].netPrice) + Number(array[i].netPrice) * Number(array[i].tax))
                }
            }
            if (!array[i].name || !array[i].quantity || !array[i].netPrice || !array[i].tax) {
                this.setState({disabled: true});
            }
            else {
                this.setState({disabled: false});
            }
        }
        this.setState({formTable: array});
    };

    handleAdd = (e) => {
        const array = this.state.formTable;
        const object = {
            id: (array.length + 1),
            name: undefined,
            quantity: undefined,
            netPrice: undefined,
            tax: undefined,
            grossPrice: undefined,
        };
        array.push(object);
        this.setState({formTable: array});
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const frm = document.getElementById("items-form");
        this.setState({
            formTable: [
                {
                    id: 0,
                    name: undefined,
                    quantity: undefined,
                    netPrice: undefined,
                    tax: [],
                    grossPrice: undefined,
                }
            ],
            disabled: true
        });
        sessionStorage.clear();
        frm.reset();
    };

    componentDidMount() {
        this.itemsData = JSON.parse(sessionStorage.getItem('items'));

        if (sessionStorage.getItem('items')) {
            this.setState({
                    formTable: [
                        {
                            id: 0,
                            name: this.itemsData.name,
                            quantity: this.itemsData.quantity,
                            netPrice: this.itemsData.netPrice,
                            tax: this.itemsData.tax,
                            grossPrice: this.itemsData.grossPrice,
                        }
                    ],
                    disabled: this.itemsData.disabled,
                }
            )
        }

        else {
            this.setState({
                formTable: [
                    {
                        id: 0,
                        name: undefined,
                        quantity: undefined,
                        netPrice: undefined,
                        tax: undefined,
                        grossPrice: undefined,
                    }
                ],
                disabled: true
            })
        }
    }

    componentDidUpdate(nextProps, nextState) {
        sessionStorage.setItem('items', JSON.stringify(nextState));
    }


    render() {
        return (
            <Container>
                <div>
                    {this.state.formTable.map((obj) => {
                        return <FormItem key={obj.id}
                                         handleChange={this.handleChange}
                                         handleSelectChange={this.handleSelectChange}
                                         tableObj={obj}/>
                    })
                    }
                </div>
                <Form>
                    <Form.Group widths='equal'>
                        <Button onClick={this.handleAdd}>Dodaj</Button>
                        <Button floated='right' disabled={this.state.disabled}
                                onClick={this.handleSubmit}>Wyślij</Button>
                    </Form.Group>
                </Form>
            </Container>

        );
    }
}

export default MyForm

