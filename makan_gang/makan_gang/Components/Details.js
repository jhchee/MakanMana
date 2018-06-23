import React from 'react';
import {Text , ScrollView , Image ,StyleSheet ,Dimensions}  from 'react-native'
import {Button , View , Row ,Divider ,InlineGallery} from '@shoutem/ui'
import {Constants} from 'expo'


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

  //fetch data from Google Place Details
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
    return(
      <ScrollView>
        <Text>Welcome to Details :)</Text>
        <Text>{this.state.name}</Text>
        {this.state.data.length?
          <InlineGallery styleName='large-wide' data={this.state.data}/>
          : <Text> Image not available </Text>
        }

          {   this.state.reviews?
                this.state.reviews.map((review) => {
                if(review.text){
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
                }
              })
            : <Text>No review available</Text>
        }
      </ScrollView>
    )
  }
}

export default Details
