const numPoints = 100;
let points = [];
let polygons = [];

function setup() {
    createCanvas(500, 500);
    noFill();
    points = createRandomPoints(numPoints);

    voronoiRound(points, 'black');
}

function voronoiRound(points, color) {
    // drawPoints(points, color);

    const polygons = generateVoronoi(points, 50);

    drawPolygons(polygons, color);

    return generateCentroids(polygons);
}

function draw() {
    background(255)
    points = voronoiRound(points, 'black');
}

function generateCentroids(polygons) {
    const centroids = [];
    for (let i = 0; i < polygons.length; i++) {
        const verticesArray = [];
        for (var j = 0; j < polygons[i].length; j++) {
            verticesArray.push({x: polygons[i][j].x, y: polygons[i][j].y})
        }
        const centroid = getCentroid(verticesArray);
        centroids.push(centroid);
    }
    return centroids;
}

function getCentroid(points) {
    const l = points.length;
    
    return points.reduce(function(center, p, i) {
        center.x += p.x;
        center.y += p.y;
    
        if(i === l - 1) {
            center.x /= l;
            center.y /= l;
        }
    
        return center;
    }, {x: 0, y: 0});
}