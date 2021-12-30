
export function getRoomType(idRoomType) {
    const url = '/roomTypes/' + idRoomType;
    return fetch(url,{
        headers: {'Accept': 'application/json'}
    })
    .then((response) => response.json())
  }