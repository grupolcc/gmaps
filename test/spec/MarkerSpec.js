describe('Creating a marker', () => {
  let map; let
    marker;

  beforeEach(() => {
    map = map || new GMaps({
      el: '#map-with-markers',
      lat: -12.0533,
      lng: -77.0293,
      zoom: 14,
    });
  });

  describe('With basic options', () => {
    beforeEach(() => {
      map.removeMarkers();

      marker = map.addMarker({
        lat: -12.0533,
        lng: -77.0293,
        title: 'New marker',
      });
    });

    it('should add the marker to the markers collection', () => {
      expect(map.markers.length).toEqual(1);
      expect(map.markers[0]).toEqual(marker);
    });

    it('should create a marker with defined position', () => {
      // Fix for floating-point bug
      expect(parseFloat(marker.getPosition().lat().toFixed(4))).toEqual(-12.0533);
      expect(parseFloat(marker.getPosition().lng().toFixed(4))).toEqual(-77.0293);
    });
  });

  describe('With events', () => {
    let callbacks;

    beforeEach(() => {
      callbacks = {
        onclick() {
          console.log(this.title);
        },
      };

      spyOn(callbacks, 'onclick').andCallThrough();

      map.removeMarkers();

      marker = map.addMarker({
        lat: -12.0533,
        lng: -77.0193,
        title: 'New marker',
        click: callbacks.onclick,
      });
    });

    it('should respond to click event', () => {
      google.maps.event.trigger(marker, 'click');

      expect(callbacks.onclick).toHaveBeenCalled();
    });
  });
});

describe('Removing markers', () => {
  let map;

  beforeEach(() => {
    map = new GMaps({
      el: '#map-with-markers',
      lat: -12.0533,
      lng: -77.0293,
      zoom: 14,
    });

    map.addMarkers([{
      lat: -12.0523,
      lng: -77.0297,
      title: 'Marker #1',
    }, {
      lat: -12.0531,
      lng: -77.0289,
      title: 'Marker #2',
    }, {
      lat: -12.0537,
      lng: -77.0299,
      title: 'Marker #3',
    }, {
      lat: -12.0532,
      lng: -77.0278,
      title: 'Marker #4',
    }]);
  });

  it('should remove a marker from the markers collection', () => {
    map.removeMarker(map.markers[0]);

    expect(map.markers.length).toEqual(3);
  });

  it('should remove an array of markers from the markers collection', () => {
    const markers = map.markers.slice(0, 2);
    map.removeMarkers(markers);

    expect(map.markers.length).toEqual(2);
  });
});
