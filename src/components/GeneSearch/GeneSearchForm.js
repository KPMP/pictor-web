import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardBody } from 'reactstrap';
import { AutoComplete, Form } from 'antd';
import genes from '../../data/genes';
import { withRouter } from "react-router-dom";
import ReactGA from 'react-ga';

class GeneSearchForm extends Component {

    constructor(props) {
        super(props);
        let geneList = genes.genes;
        geneList.sort();
        this.state = {
            dataSource : [],
            validateStatus: "success",
            help: "",
            geneList: geneList,
            geneSymbol: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSearch = (value) => {
        if (value === "" || value === undefined) {
            this.setState({dataSource: []});
        } else {
            let limitedList = this.state.geneList.filter(gene => gene.toUpperCase().indexOf(value.toUpperCase()) !== -1);
            if (limitedList.length === 0) {
                this.setState({validateStatus: "error", help: "Gene not found"});
            } else {
                this.setState({validateStatus: "success", help:""});
            }
            this.setState({dataSource: limitedList.slice(0,10)});
        }
    }

    handleSelect = (value) => {
        this.setState({geneSymbol: value});
        this.handleSubmit();
        ReactGA.event({
			category: 'Gene Search',
			action: value
        });
    }

    handleSubmit(e) {
        this.props.setSelectedGene(this.state.geneSymbol);
        this.props.dispatch(() => this.props.history.push("summary"));
    }

    render() {
        let { getFieldDecorator } = this.props.form;
        return(
            <Card className="mt-3">
                <CardBody id="search-for-gene">
                    <h5>Search by gene</h5>
                    <Form>
                        <Form.Item validateStatus={this.state.validateStatus} help={this.state.help}>
                            {getFieldDecorator('geneSymbol', { })(
                            		<AutoComplete style={{"width": "200px"}} dataSource={this.state.dataSource} className="pr-3"
                            			onSearch={this.handleSearch} onSelect={this.handleSelect} name="geneSymbol"
                                        defaultActiveFirstOption={true} backfill={true} defaultValue={this.state.geneSymbol}
                            		/>
                            )}
                        </Form.Item>
                    </Form>
                </CardBody>
            </Card>
        );
    }
}

const WrappedGeneSearchForm = Form.create({ name: 'universalHeader', validateMessage: "Required" })(GeneSearchForm);
export default withRouter(connect()(WrappedGeneSearchForm));