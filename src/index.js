import Point from './point'
import Model from './model'

export default class Wanda {
  constructor() {
    this.model = new Model()
  }

  train(id, data) {
    console.log('training')
  }

  recognize(data) {
    console.log('recognize')
  }
}
