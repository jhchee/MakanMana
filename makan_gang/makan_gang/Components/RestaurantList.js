import React from 'react';
import {Text , ScrollView , Image ,StyleSheet ,Dimensions}  from 'react-native'
import {Button , View , Row ,Divider ,InlineGallery} from '@shoutem/ui'
import {Constants} from 'expo'
import Details from './Details.js'


class RestaurantList extends React.Component {
  render(){
    return(
        <ScrollView>
          {
            this.props.restaurant_data.map ((restaurant , index) => {
              return (

                <Row key={restaurant.name}>
                  <View>
                    <View style={{flex:1}} styleName='horizontal'>
                      <View style = {{width:Dimensions.get('window').width / 2 , flex:3/4 }}>
                        <Button style={{justifyContent:'flex-start'}} styleName = 'tight' onPress={()=>this.props.markerButton(restaurant.geometry.location.lat , restaurant.geometry.location.lng , restaurant.name)}><Text>{restaurant.name}</Text></Button>
                      </View>
                        <Button style={{flex:1/4 , backgroundColor:'#FF5733' ,paddingTop:5, paddingBottom:5 , paddingLeft:5 , paddingRight:5 }} styleName = 'tight' onPress ={() => this.props.detailsButton('Details' , {dataArr:restaurant})} >
                         <Text style={{color:'white'}}>Details</Text>
                        </Button>
                    </View>
                    <Text>{this.props.restaurant_distance[index]} away</Text>
                  </View>
                </Row>
              )
            })
          }
        </ScrollView>
    )
  }
}

export default RestaurantList
