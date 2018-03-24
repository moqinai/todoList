import '../assets/stylus/footer.styl'

export default {
  data () {
    return {
      author: 'Jokcy'
    }
  },
  render () {
    return (
      <div class="footer">
        <span>Weitten by {this.author}}</span>
      </div>
    )
  }
}