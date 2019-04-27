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
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSearch = (value) => {
        if (value === "" || value === undefined || value.length < 2) {
            this.setState({dataSource: []});
        } else {
            let limitedList = this.state.geneList.filter(gene => {
                const matches = gene.toUpperCase().match('^' + value.toUpperCase());
                return matches && matches.length > 0;
            });
            if (limitedList.length === 0) {
                this.setState({validateStatus: "error", help: "Gene not found"});
            } else {
                this.setState({validateStatus: "success", help:""});
            }
            this.setState({dataSource: limitedList});
        }
    }

    handleSelect = (value) => {
    	this.setState({geneSymbol: value});
    	this.handleSubmit(value);
        ReactGA.event({
			category: 'Gene Search',
			action: value
        });
    }

    handleSubmit(value) {
        this.props.setSelectedGene(value);
        this.props.dispatch(() => this.props.history.push("summary"));
    }

    render() {
        let { getFieldDecorator } = this.props.form;
        return(
            <Card className="mt-3">
                <CardBody id="search-for-gene">
                    <Form layout="inline">
                        <Form.Item colon={false} label={<span id="gene-search-label">Search by gene</span>} validateStatus={this.state.validateStatus} help={this.state.help}>
                            {getFieldDecorator('geneSymbol', { })(
                            		<AutoComplete style={{"width": "200px"}} dataSource={this.state.dataSource} className="pr-3"
                            			onSearch={this.handleSearch} onSelect={this.handleSelect} name="geneSymbol"
                                        defaultActiveFirstOption={true} backfill={true}
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