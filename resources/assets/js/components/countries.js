import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {debounce} from "lodash/function";

export default class Countries extends Component
{
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.getCountries = debounce(this.getCountries.bind(this), 1500);

        this.state = {
            error: false,
            query: '',
            results: []
        }
    }

    getCountries() {
        this.setState({error: false});
        axios.get('/find/' + this.state.query)
            .then( (response) => {
                this.setState({results: response.data});
            })
            .catch( (error) => {
                this.setState({results: []});
                this.setState({error: true});
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({
            query: event.target.value
        }, () => {
            if (this.state.query && this.state.query.length > 1) {
                this.getCountries()
            }
        });
    }

    handleInputChange(event) {
        this.setState({
            query: event.target.value
        }, () => {
            if (this.state.query && this.state.query.length > 1) {
                this.getCountries()
            }
        });
    }

    render() {
        return (
            <div className='header'>
                <div className='input-container'>
                    <form onSubmit={this.handleSubmit}>
                        <input
                            type="text"
                            placeholder="Search for a Country by name or alpha code!"
                            onChange={this.handleInputChange}
                        />
                    </form>
                </div>
                <SearchResults searchResults={this.state.results} />
                <Regions results={this.state.results} />
            </div>
        )
    }

}

class SearchResults extends Component
{
    constructor(props) {
        super(props);
    }

    render() {
        // a status key indicates an error was thrown in getCountries, so no results were found.
        if (this.props && this.props.searchResults.hasOwnProperty('status')) {
            return(
                <div className="no-results">No Countries Found!</div>
            )
        }
        // Single country is returned in response, searched by alpha 2 or 3 code
        // Will have name property since restcountries returns a single object, not an array
        if (this.props && this.props.searchResults.hasOwnProperty('name')) {
            return <Country country={this.props.searchResults} />
        }

        let countries = this.props.searchResults.map( (country, index) => {
            return <Country key={index} country={country}/>
        });

        return (
            <div className="countries">{countries}</div>
        );
    }
}

class Country extends Component
{
    constructor(props) {
        super(props);

        this.flagStyle = {
            backgroundImage: 'url(' + this.props.country.flag + ')',
        };
    }

    render() {
        return(
            <div className="row country">
                <div className='col-md-3 flag' style={this.flagStyle}></div>
                <div className='col-md-9'>
                    <div className='info'>
                        <h1>{this.props.country.name}</h1>
                        <p><span className='label'>Population: </span>{this.props.country.population}</p>
                        <p><span className='label'>Alpha2 code: </span>{this.props.country.alpha2Code}<span className='label'>   Alpha3 code: </span>{this.props.country.alpha3Code}</p>
                        <p><span className='label'>Region: </span>{this.props.country.region}<span className='label'>   Subregion: </span>{this.props.country.subregion} </p>
                        <p><span className='label'>Official Languages: </span>
                            {this.props.country.languages.map( (language, i) => {
                                return <span key={i}>{language.name} </span>
                            })}
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

class Regions extends Component
{
    constructor(props) {
        super(props);
    }



    render() {
        if(this.props.results && this.props.results.length > 0) {
            let regions = this.props.results.reduce(function(obj, v) {
                obj[v.region] = (obj[v.region] || 0) +1;
                return obj;
            }, {});
            let subregions = this.props.results.reduce(function(obj, v) {
                obj[v.subregion] = (obj[v.subregion] || 0) +1;
                return obj;
            }, {});
            return (
                <div className="row country-numbers">
                    <div className='col-md-12'>
                        <h3>Countries found: {this.props.results.length}</h3>
                    </div>
                    <div className='col-md-6'>
                        <h3>Region</h3>
                        {Object.keys(regions).map(function(key) {
                            return <div key={key}>{key}: {regions[key]}</div>;
                        })}
                    </div>
                    <div className='col-md-6'>
                        <h3>Subregion</h3>
                        {Object.keys(subregions).map(function(key) {
                            return <div key={key}>{key}: {subregions[key]}</div>;
                        })}
                    </div>
                </div>
            )
        } else {
            return null;
        }
    }
}

// ========================================

ReactDOM.render(
    <Countries />,
    document.getElementById('root')
);
