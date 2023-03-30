import React, { Component } from "react";
import { View, FlatList } from "react-native";
import axios from "axios";

export default class PopularMoiveStream extends Component{
    constructor(props){
        super(props);
        this.state={
            data:[]
        }
    }
    componentDidMount(){
        this.getData();
    }
    timeConvert(num){
        var hours=Math.floor(num/60);
        var minutes = num % 60;
    return `${hours} hrs ${minutes} mins`;
    }


getData= () => {
    const url = "http://localhost:5000/get-movie";
    axios
      .get(url)
      .then(response => {
        let details = response.data.data;
        details["duration"] = this.timeConvert(details.duration);
        this.setState({ movieDetails: details });
      })
      .catch(error => {
        console.log(error.message);
      });
    }
    render(){
        const {data}=this.state
        return(
         <View style={styles.container}>
            <FlatList>
            data={data}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
            </FlatList>
         </View>
        )
      }
  };
