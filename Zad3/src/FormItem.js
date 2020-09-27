import React, {Component} from 'react'
import {
    Form,
    Input,
    Select,
} from 'semantic-ui-react'

const options = [
    {key: '8', text: '8%', value: 0.08},
    {key: '23', text: '23%', value: 0.23},
    {key: '32', text: '32%', value: 0.32},
];

class FormItem extends Component {

    render() {
        const {handleChange, handleSelectChange, tableObj} = this.props;
        return (
            <Form id="items-form">
                <Form.Group widths='equal'>
                    <Form.Field
                        value={tableObj.name}
                        name="name"
                        control={Input}
                        placeholder='Nazwa'
                        required = {true}
                        onBlur={(e) => handleChange(e, tableObj.id)}
                    />
                    <Form.Field
                        type="number"
                        value={tableObj.quantity}
                        name="quantity"
                        control={Input}
                        placeholder='Ilość'
                        onBlur={(e) => handleChange(e, tableObj.id)}
                    />
                    <Form.Field
                        type="number"
                        value={tableObj.netPrice}
                        name="netPrice"
                        control={Input}
                        placeholder='Cena netto'
                        onBlur={(e) => handleChange(e, tableObj.id)}
                    />
                    <Form.Field
                        type="number"
                        value={tableObj.tax}
                        name="tax"
                        control={Select}
                        options={options}
                        placeholder='Podatek'
                        onChange={(e, {value}) =>
                            handleSelectChange(e, value, tableObj.id)}
                    />
                    <Form.Field
                        type="number"
                        value={tableObj.grossPrice}
                        name="grossPrice"
                        control={Input}
                        placeholder='Cena brutto'
                        readOnly={true}
                    />
                </Form.Group>
            </Form>
        )
    }
}

export default FormItem
