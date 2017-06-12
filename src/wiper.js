function init () {
  let slice
  let dataURL
  let position = 0
  let sliceWidth = 1
  let width = 1920
  let height = 1080
  // let hold = false

  const video = document.getElementById('video')
  const img = document.getElementById('canvasImg')
  const canvas = document.getElementById('main')
  const banvas = document.getElementById('back')
  const ctx = canvas.getContext('2d')
  const btx = banvas.getContext('2d')

  video.width = canvas.width = banvas.width = img.width = width
  video.height = canvas.height = banvas.height = img.height = height
  ctx.imageSmoothingEnabled = btx.imageSmoothingEnabled = false

  video.loop = 1
  video.controls = 1
  video.autoplay = 1
  video.playbackRate = 1

  function wipe () {
    position = position += sliceWidth

    btx.drawImage(video, 0, 0, width, height)

    if (video.paused) {
      [slice = 1] = [slice]
    } else {
      slice = btx.getImageData(position, 0, sliceWidth, height)
    }

    slice = btx.getImageData(position, 0, sliceWidth, height)

    if (position > width) {
      position = 0
      dataURL = canvas.toDataURL()
      img.src = dataURL
    }

    ctx.putImageData(slice, position, 0)
  }

  function update () {
    wipe()
    requestAnimationFrame(update)
  }

  requestAnimationFrame(update)
}

init()
