// {this.state.restaurant_data.map((restaurant)=>{
//   return (
//      <MapView.Marker onPress={MapView.Marker.showCallout} key={restaurant.name} coordinate = {{'latitude':restaurant.geometry.location.lat , 'longitude':restaurant.geometry.location.lng}} >
//        <MapView.Callout>
//          <View>
//            <Text>this is {restaurant.name} </Text>
//            {/* <Image style={{width:100 , height:100}} source = {{uri:`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${restaurant.photos[0].photo_reference}&key=AIzaSyA5Wh0i7U7fsLkCG0FWXZr2X6yqegppIcM`}} /> */}
//          </View>
//        </MapView.Callout>
//      </MapView.Marker>
//   )
//
// })
// }

import React from 'react';
import {Text , ScrollView , Image ,StyleSheet ,Dimensions}  from 'react-native'
import MapView  from 'react-native-maps';
import {Button , View , Row ,Divider ,InlineGallery} from '@shoutem/ui'
import {Constants} from 'expo'

import Details from './Components/Details.js'
import RestaurantList from './Components/RestaurantList.js'

import {createStackNavigator} from 'react-navigation'


class MapHome extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      lat: null,
      long: null,
      restaurant_data : [] ,
      restaurant_distance : [] ,
    }

  }

  componentDidMount() {
      console.log('mounted')

      navigator.geolocation.getCurrentPosition(

         (position) => {

           console.log("wokeeey");

           console.log(position);

           this.setState({

             lat: position.coords.latitude,

             long: position.coords.longitude,

             error: null,

           });

         },

         (error) => this.setState({ error: error.message }),

         { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },

       );

     }

     calculateDistance = (oriLat , oriLong , desLat , desLong) => {
       const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${oriLat},${oriLong}&destination=${desLat},${desLong}&unit=metric&key=AIzaSyA5Wh0i7U7fsLkCG0FWXZr2X6yqegppIcM`
       this.setState({
         restaurant_distance : []
       })
       return (
         fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
          console.log('distance api response' , responseJson.routes[0].legs[0].distance.text)
          this.setState({
              restaurant_distance : [...this.state.restaurant_distance , responseJson.routes[0].legs[0].distance.text]
          }
          )
          console.log('inside calculateDistance' , this.state.restaurant_distance)
        })
      )


     }

     fetchData = () => {
         const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.state.lat},${this.state.long}&radius=1500&type=restaurant&key=AIzaSyA5Wh0i7U7fsLkCG0FWXZr2X6yqegppIcM`
       return (
         fetch(url)
           .then((response) => response.json())
           .then((responseJson) => {
             this.setState({
               restaurant_data:responseJson.results
             })

           })
           .then(()=>{
             this.state.restaurant_data.map((res) => {
               this.calculateDistance(this.state.lat , this.state.long , res.geometry.location.lat , res.geometry.location.lng)
             })
           })
           .catch((error) => {
             console.error(error)
           })


       )
     }

  render() {
    return (
      <View style={{flex:1 }}>
     { this.state.lat && this.state.long &&
       <MapView
        style={{ flex: 1/2 }}
        initialRegion={{
          latitude: this.state.lat ,
          longitude: this.state.long ,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>

              {!!this.state.lat && !!this.state.long && <MapView.Marker

                 coordinate={{"latitude":this.state.lat,"longitude":this.state.long}}

                 title={"Your Location"}

               />}
        </MapView>
      }


        <MapView.Callout>
            <Button  style = {{marginTop:Constants.statusBarHeight}} onPress={this.fetchData}>
              <Text>Show Restaurant</Text>
            </Button>
        </MapView.Callout>

      {(this.state.restaurant_distance.length===this.state.restaurant_data.length)?
        <RestaurantList restaurant_data = {this.state.restaurant_data} restaurant_distance = {this.state.restaurant_distance} button={this.props.navigation.navigate}/>
        : <View><Text>Error loading nearby restaurant list</Text></View>
      }
    </View>
    )
  }
}



const RootStack = createStackNavigator({
    Map : { screen: MapHome} ,
    Details : { screen: Details} ,

}
)

//main app
export default class App extends React.Component{
  render(){
    return <RootStack />
  }
}



const style = StyleSheet.create({

})
