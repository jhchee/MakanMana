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

                  console.log(this.state)

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
             // for(i = 0 ; i < responseJson.results.length ; i++)
             // console.log(responseJson.results[i].photos[0].photo_reference)
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
        <ScrollView>
          {
            this.state.restaurant_data.map ((restaurant , index) => {
              return (
                <Row key={restaurant.name}>
                  <View>
                    <View style={{flex:1}} styleName='horizontal'>
                      <View style = {{width:Dimensions.get('window').width / 2 , flex:3/4 }}>
                        <Button style={{justifyContent:'flex-start'}} styleName = 'tight'><Text>{restaurant.name}</Text></Button>
                      </View>
                        <Button style={{flex:1/4 , backgroundColor:'#FF5733' ,paddingTop:5, paddingBottom:5 , paddingLeft:5 , paddingRight:5 }} styleName = 'tight' onPress={()=>this.props.navigation.navigate('Details' , {dataArr:restaurant})}>
                            <Text style={{color:'white'}}>Details</Text>
                        </Button>
                    </View>
                    <Text>{this.state.restaurant_distance[index]} away</Text>
                  </View>
                </Row>
              )
            })
          }
        </ScrollView>
        : null
      }
    </View>
    )
  }
}

class Details extends React.Component {
  constructor(){
    super()
    this.state = {
      photos: [],
      data : [],
      reviews: [],
      name : '' ,
    }
  }

  fetchDetails(){
    const { navigation } = this.props
    const dataArr = navigation.getParam('dataArr' , null)
    console.log(dataArr)
    const url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${dataArr.place_id}&fields=name,review,opening_hours,photo,rating,formatted_address&key=AIzaSyA5Wh0i7U7fsLkCG0FWXZr2X6yqegppIcM`

    return(

      fetch(url)
        .then( response => response.json())
        .then( responseJson => {
            console.log('details' , responseJson.result.photos)
            if('photos' in responseJson.result){
              this.setState({
                photos : responseJson.result.photos,
                name : responseJson.result.name,
                reviews: responseJson.result.reviews,
              })
            }
            else{
              this.setState({
                name : responseJson.result.name,
                reviews: responseJson.result.reviews,
              })
            }
        })
      )
    }

  componentDidMount(){
    this.fetchDetails().then(() => {
      (this.state.photos.length)
          ?this.state.photos.map((photoID , index) => {
            this.setState({
              data: [...this.state.data , { 'source' : {'uri':`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoID.photo_reference}&key=AIzaSyA5Wh0i7U7fsLkCG0FWXZr2X6yqegppIcM`}}]
            })
            console.log(this.state.data[index].source.uri)
            // return <Image  key={photoID.photo_reference} style={{width:100 , height:100}} source = {{uri:`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoID.photo_reference}&key=AIzaSyA5Wh0i7U7fsLkCG0FWXZr2X6yqegppIcM`}} />
          })
          :null
    })
  }

  render(){

    // const restaurant = fetch(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${dataArr.place_id}&fields=review,opening_hours,photo,rating,formatted_address&key=AIzaSyA5Wh0i7U7fsLkCG0FWXZr2X6yqegppIcM`)
    return(
      <ScrollView>
        <Text>Welcome to Details :)</Text>
        <Text>{this.state.name}</Text>

         {/* <View>
          {(this.state.photos.length)
              ?this.state.photos.map((photoID , index) => {
                return <Image  key={photoID.photo_reference} style={{width:100 , height:100}} source = {{uri:`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoID.photo_reference}&key=AIzaSyA5Wh0i7U7fsLkCG0FWXZr2X6yqegppIcM`}} />
              })
              :<Text>Image not available</Text>
          }
        </View> */}

        <InlineGallery styleName='large-wide' data={this.state.data}/>

          {this.state.reviews.map((review) => {
            return(
              <View key={review.author_name}>
                <Row>
                  <View styleName='vertical'>
                    <Text>{review.author_name}</Text>
                    <Text styleName='multiline'>{review.text}</Text>
                  </View>
                </Row>
                <Divider styleName='line'/>
              </View>
            )
          })}

      </ScrollView>
    )
  }
}

const RootStack = createStackNavigator({
    Map : { screen: MapHome} ,
    Details : { screen: Details} ,

}
)

export default class App extends React.Component{
  render(){
    return <RootStack />
  }
}



const style = StyleSheet.create({

})
