import Point from './point'
import Cloud from './cloud'
import Constants from './constants'
import {resample, scale, translateTo, greedyCloudMatch} from './utils'

export default class Wanda {
  constructor() {
    this.templates = []
  }

  /* where data is an array of strokes
   * [ [{x,y}, {x,y}], [{x,y}] ]
  */
  train(id, data) {
    console.log('training')
    const flattened = data.map((stroke, i) => {
      return stroke.map((point) => ({
        ...point,
        strokeId: i+1
      }))
    })
    .reduce((a,b) => (a.concat(b)), [])
    .map((point) => {
      return new Point(point.x, point.y, point.strokeId)
    })

    this.templates.push(new Cloud(id, flattened))
  }

  recognize(points) {
    console.log('recognize')
    points = resample(points, Constants.NUM_POINTS)
    points = scale(points)
    points = translateTo(points, Constants.ORIGIN)

    let b = +Infinity
    let u = -1

    for (let i=0; i<this.templates.length; ++i) {
      let d = greedyCloudMatch(points, this.templates[i])

      if (d < b) {
        b = d // least distance
        u = i // cloud index
      }
    }

    if (u === -1) {
      return null
    } else {
      return {
        id: this.templates[u].id,
        score: Math.max((b - 2.0) / -2.0, 0.0)
      }
    }
  }
}
