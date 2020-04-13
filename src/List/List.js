import React, { Component } from 'react'
import { Button, View, StyleSheet } from 'react-native'

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
            <div style={{width:"auto", backgroundColor:"#f00"}}>
            
                <View style={styles.pokedexBorder}>
                    <View style={styles.pokedexlist}>
                        <ul>
                            { data.results.map((dat) => <li style={{color:"#eee", fontWeight:"bold"}} key={dat.name}>{dat.name}</li>) } 
                        </ul>
                    </View>
                </View>
                
                <View style={styles.container} >
                { data.previous !== null ? <Button style={styles.buttonContainer} onPress={this.getPrevSet} title="Get Prev 20"/> : <div></div> }
                { data.next !== null ? <Button style={styles.buttonContainer} onPress={this.getNextSet} title="Get Next 20"/> : <div></div> }
                </View>
            </div>
            
        </>
        )

    }

}

const styles = StyleSheet.create({
    pokedexBorder: {
        width:240,
        margin:20,
        borderRadius: 10,
        backgroundColor:"#eee"
    }, 
    pokedexlist: {
        width:200,
        margin: 20,
        borderRadius: 10,
        backgroundColor:"#000"
    },
    container: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20
    },
    buttonContainer: {
        width:100,
        margin:15
    }
  });

export default List