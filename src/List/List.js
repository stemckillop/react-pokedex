import React from 'react'
import { Button } from 'react-native'

class List extends React.Component {

    state = { data: [], loading : true, error: "" }

    async componentDidMount() {

        this.getSet('https://pokeapi.co/api/v2/pokemon/')
        this.getNextSet = this.getNextSet.bind(this)
        this.getPrevSet = this.getPrevSet.bind(this)
    }

    async getSet(data) {
        try {
            const stack = await fetch(data)
            const stackJSON = await stack.json()
            console.log(stackJSON)
            this.setState({data: stackJSON, loading: false})
        } catch (e) {
            console.log("Caught Exception")
            this.setState({
                data: [],
                loading: false,
                error: e.message
            })
        }
    }

    getNextSet() {
        this.setState({ loading: true })
        const { data, loading } = this.state
        if (loading) {
            return
        }

        this.getSet(data.next)
    }

    getPrevSet() {
        this.setState({ loading: false })
        const { data, loading } = this.state
        if (loading) {
            return
        }

        this.getSet(data.previous)
    }

    render() {

        const { data, loading } = this.state

        if (this.state.error) {
            return <div>{this.state.error}</div>
        }
        if (this.state.loading) {
            return <div>Loading...</div>
        }

        return (
        <>
            <ul>
                { data.results.map((dat) => <li key={dat.name}>{dat.name}</li>) } 
            </ul>
            { data.previous !== null ? <Button onPress={this.getPrevSet} title="Get Prev 20"/> : <div></div> }
            { data.next !== null ? <Button onPress={this.getNextSet} title="Get Next 20"/> : <div></div> }
        </>
        )

    }

}

export default List