import Point from './point'

// return minimum cost for specific template
export function greedyCloudMatch(points, cloud) {
	const e = 0.50
	const step = Math.floor(Math.pow(points.length, 1 - e))
	let min = +Infinity

	for (let i=0; i<points.length; i+=step) {
		let d1 = cloudDistance(points, cloud.points, i)
		let d2 = cloudDistance(cloud.points, points, i)
		// min = Math.min(min, Math.min(d1, d2))
    min = Math.min(min, d1, d2)
	}

	return min
}

// returns distance between two clouds
export function cloudDistance(points1, points2, start) {
  const matched = new Array(points1.length).fill(false) // points1.length === points2.length
  let sum = 0
  let i = start

  do {
    let index = -1;
    let min = +Infinity;

    for (let j=0; j<matched.length; ++j) {
      if (!matched[j]) {
        let d = distance(points1[i], points2[j])

        if (d < min) {
          min = d
          index = j
        }
      }
    }

    matched[index] = true
    let weight = 1 - ((i - start + points1.length) % points1.length) / points1.length
    sum += weight * min
    i = (i + 1) % points1.length
  } while (i != start)

  return sum
}

export function resample(points) {
  const I = pathLength(points) / (n - 1) // interval length
  let D = 0.0;
  const newpoints = new Array(points[0])

  for (let i=1; i<points.length; ++i) {
    if (points[i].strokeId === points[i-1].strokeId) {
      let d = distance(points[i - 1], points[i])

      if ((D + d) >= I) {
        let qx = points[i - 1].x + ((I - D) / d) * (points[i].x - points[i - 1].x)
        let qy = points[i - 1].y + ((I - D) / d) * (points[i].y - points[i - 1].y)
        let q = new Point(qx, qy, points[i].strokeId)

        newPoints.push(q)
        points.splice(i, 0, q)
        D = 0.0
      } else {
        D += d
      }
    }
  }

  if (newPoints.length === n - 1)
    newPoints.push(new Point(points[points.length - 1].x, points[points.length - 1].y, points[points.length - 1].strokeId))
  return newPoints
}

export function scale(points) {
  let minX = +Infinity
  let maxX = -Infinity
  let minY = +Infinity
  let maxY = -Infinity

  for (let i=0; i<points.length; ++i) {
    minX = Math.min(minX, points[i].x)
    minY = Math.min(minY, points[i].y)
    maxX = Math.max(maxX, points[i].x)
    maxY = Math.max(maxY, points[i].y)
  }

  const size = Math.max(maxX - minX, maxY - minY)
  const newPoints = []

  for (let i=0; i<points.length; ++i) {
    let qx = (points[i].x - minX) / size
    let qy = (points[i].y - minY) / size

    newPoints.push(new Point(qx, qy, points[i].strokeId))
  }

  return newPoints
}

export function translateTo(points, destination) {
  const centroid = centroid(points)
  const newPoints = []

  for (let i=0; i<points.length; ++i) {
    let qx = points[i].x + destination.x - centroid.x
    let qy = points[i].y + destination.y - centroid.y

    newPoints.push(new Point(qx, qy, points[i].strokeId))
  }

  return newPoints
}

export function centroid(points) {
  let x = 0.0
  let y = 0.0

  for (let i=0; i<points.length; ++i) {
    x += points[i].x
    y += points[i].y
  }

  x /= points.length
  y /= points.length

	return new Point(x, y, 0)
}

// path1 and path2 are array of points in two paths
// returns average distance between corresponding points in two paths
export function pathDistance(path1, path2) {
  const length = path1.length // assume equal length paths
  let d = 0.0

  for (let i=0; i<length; ++i) {
    d += distance(path1[i], path2[i])
  }

  return d/length
}

// returns length traversed by a path
export function pathLength(points) {
  let d = 0.0

  for (let i=1; i<points.length; ++i) {
    if (points[i].strokeId === points[i-1].strokeId) {
      d += distance(points[i-1], points[i])
    }
  }

  return d
}

// returns Euclidean distance between two points
export function distance(p1, p2) {
  const dx = p2.x - p1.x
  const dy = p2.y - p1.y

  return Math.sqrt(dx*dx + dy*dy)
}
