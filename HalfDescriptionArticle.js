import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import HTMLView from './costum_modules/react-native-htmlview';
import ArticleCard from './ArticleCard';
import ArticleCardSection from './ArticleCardSection';
import ArticleCardSection2 from './ArticleCardSection2';
import ShareButton from './ShareButton';

class HalfDescriptionArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {title: props.article.title.rendered, imageID: 'https://now.tufts.edu/sites/default/files/bodyimages/150429_jumbo_L_inside.jpg', authorID: props.article.author, isLoading: true};
  }

  componentWillMount() {
    this.Mounted = true;
    this.fetchAuthor();
    if (this.props.article.featured_media == 0) {
      this.setState({ isLoading: false })
    }
    else {
      this.fetchImage();
    }
  }

  componentWillUnmount() {
    this.Mounted = false;
  }

  setURL() {
    return ('https://tuftsdaily.com/wp-json/wp/v2/media/' + (this.props.article.featured_media).toString());
  }

  async fetchImage() {
      try {
        let response = await fetch(this.setURL());
        let responseJson = await response.json();
        if (this.Mounted) {
          this.setState({ imageID: responseJson.media_details.sizes.medium.source_url, isLoading: false });
        }
      } catch(error) {
        console.error(error);
      }
    }

  setAuthorURL() {
    return ('https://tuftsdaily.com/wp-json/wp/v2/users/' + this.props.article.author)
  }

  async fetchAuthor() {
      try {
        let response = await fetch(this.setAuthorURL());
        let responseJson = await response.json();
        if (this.Mounted) {
        this.setState({ authorID: responseJson.name });
      }
      } catch(error) {
        console.error(error);
      }
    }

render() {
  const goToArticle = () => Actions.pageThree({ article: this.props.article });
  if (this.props.isLoading) {
    return (
      <Text></Text>
    )
  }
  else {
  return (
    <TouchableOpacity style={{ marginTop: 10}} onPress={goToArticle}>
      <ArticleCard>
      <ArticleCardSection2>
        <View style={styles.headerContentStyle}>
          <View style={styles.searchBorderStyle}>
          </View>
          <Text style={styles.headerTextStyle}><HTMLView
            value={'<p>' + this.state.title + '</p>'}
          /></Text>
          <Text style={{ color: '#778899', fontSize: 10, textAlign: 'right', paddingTop: 5, justifyContent: 'center' }}>{this.state.authorID}</Text>
          <View style={{ paddingTop: 20 }}>
          <ShareButton articleURL={this.props.article.link}></ShareButton>
        </View>
        </View>
        <View style={{paddingTop: 15, marginRight: 20, paddingBottom: 25}}>
          <Text numberOfLines={6} style={styles.descriptionTextStyle}> <HTMLView
              value={this.props.article.excerpt.rendered}
            />
          </Text>
        </View>
      </ArticleCardSection2>
    </ArticleCard>
    </TouchableOpacity>
  )
}
}
}

const styles = {
  headerContentStyle: {
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    paddingTop: 10,

  },
  headerTextStyle: {
    fontSize: 18,
    fontWeight: '300',
    justifyContent: 'center',
    paddingTop: 5,
    marginLeft: 5,
    marginRight: 5,
    textAlign: 'right',
    width: 150,
    fontFamily: 'Superclarendon',
  },

  descriptionTextStyle: {
    fontSize: 14,
    color: '#696969',
    width: 150,
    lineHeight: 22

  },

  halfImageStyle: {
    width: 200,
    height: 200
  },
  searchBorderStyle: {
    borderBottomWidth: 3,
    borderColor: '#545454',
    height: 3,
    width: 140,
    marginLeft: 10
  }
};

export default HalfDescriptionArticle;
