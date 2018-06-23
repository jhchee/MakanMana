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

class RestaurantMarker extends React.Component {
render(){
  return(
    <MapView.Marker
       coordinate={{"latitude":this.props.lat,"longitude":this.props.long}}
       title={this.props.name}
     />

  )
}
}

class MapHome extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      lat: null,
      long: null,
      restaurant_data : [] ,
      restaurant_distance : [] ,
      marker : false ,
      marker_data : [{name:'' , lat:null , long:null}] ,
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

     showRestaurantMarker = (lat , long , name) => {
       console.log('showRestaurantMarker' ,this.state.marker)
       return(

       this.state.marker?
       this.setState({
         marker : !this.state.marker ,
         marker_data : [{lat:lat , long:long , name:name}],
       })
       : this.setState({
         marker: !this.state.marker ,
         marker_data: [{lat:lat , long:long , name:name}]
       })
     )
     }

     componentDidUpdate(prevProps , prevState){
       if(prevState.marker_data[0].name !== this.state.marker_data[0].name){
         this.setState({
          marker: true,
         })
       }
     }



  render() {
    return (
      <View style={{flex:1 }}>
     { this.state.lat && this.state.long &&
       <MapView
        style={{ flex: 3 }}
        initialRegion={{
          latitude: this.state.lat ,
          longitude: this.state.long ,
          latitudeDelta: 0.00922,
          longitudeDelta: 0.00621,
        }}>

              {!!this.state.lat && !!this.state.long && <MapView.Marker

                 coordinate={{"latitude":this.state.lat,"longitude":this.state.long}}

                 title={"Your Location"}

               />}

               {this.state.marker? <RestaurantMarker lat = {this.state.marker_data[0].lat} long = {this.state.marker_data[0].long} name = {this.state.marker_data[0].name}/> : null}

        </MapView>

      }
      {console.log('does this exist' , this.state.marker_data)}
      {/* {this.state.marker? <RestaurantMarker lat = {this.state.marker_data[0].lat} long = {this.state.marker_data[0].long} name = {this.state.marker_data[0].name}/> : null} */}


      <MapView.Callout>
          <Button  style = {{marginTop:Constants.statusBarHeight}} onPress={this.fetchData}>
            <Text>Show Restaurant</Text>
          </Button>
      </MapView.Callout>

      <View style={{flex:2}}>
        {(this.state.restaurant_distance.length===this.state.restaurant_data.length)?
          <RestaurantList restaurant_data = {this.state.restaurant_data} restaurant_distance = {this.state.restaurant_distance} detailsButton={this.props.navigation.navigate} markerButton={this.showRestaurantMarker}/>
          : <View><Text>Error loading nearby restaurant list</Text></View>
        }
     </View>
    </View>
    )
  }
}



const RootStack = createStackNavigator({
    Map : { screen: MapHome ,
            navigationOptions : {header:null,}} ,
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
