import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import axios from 'axios'
import ImageResults from '../image-results/ImageResults'
class Search extends Component {
    state = {
        searchText: '',
        amount: 15,
        apiUrl: 'https://pixabay.com/api',
        apiKey: '17567515-0544e9c40e4b3d7f0cb4d719c',
        images: []

    }
    onTextChange = (e) => {
        const val = e.target.value
        this.setState({ [e.target.name]: val }, () => {
            if (val === "") {
                this.setState({ images: [] })
            } else {
                axios.get(`${this.state.apiUrl}/?key=${this.state.apiKey}&q=${this.state.searchText}&img_type=photo&per_page=${this.state.amount}`)
                    .then(res => this.setState({ images: res.data.hits }))
                    .catch(err => console.log(err))
            }

        })
    }
    onAmountChange = (e, index, value) => {

        return this.setState({ amount: index.props.value })
    }
    render() {
        console.log(this.state.images)
        return (
            <div>
                <TextField
                    name="searchText"
                    value={this.state.searchText}
                    onChange={this.onTextChange}
                    floatingLabelText="Search For Images"
                    fullWidth={true}
                />
                <br />
                <InputLabel id="demo-simple-select-label">Amount</InputLabel>
                <Select
                    name="amount"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={this.state.amount}
                    onChange={this.onAmountChange}>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={15}>15</MenuItem>
                    <MenuItem value={30}>30</MenuItem>
                    <MenuItem value={50}>50</MenuItem>

                </Select>
                <br />
                {this.state.images.length > 0 ? (<ImageResults images={this.state.images} />) : null}

            </div>
        )
    }
}
export default Search
