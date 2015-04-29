# LeapMotion Foot-Gesture-Recognition

This library was created by [Nikolas Klein](https://github.com/nikolasklein) and [Christoph Labacher](https://github.com/ChristophLabacher) during an Invention Design course by Prof. Jörg Beck and [Prof. David Oswald](http://www.david-oswald.de) at [Hochschule für Gestaltung Schwäbisch Gmünd](http://www.hfg-gmuend.de). The project included tactile feeback with sound design by Werner Schäfner.

We used a LeapMotion in order to track a foot for an experiment on foot-based interaction. Since the LeapMotion library is optimised for tracking hands and hand gestures we wrote our own library on top of it, in order to have as much control as possible about how gestures were recognized. The library is written in JavaScript and has a dependency on the LeapMotion-JS- and SoundManager2-Libraries. It is able to track a foot and recognise swipes and includes a reusable selection interface with audio driven tactile feedback. The whole library is thoroughly commented.

![](/readme/setting.png)

## Results

We wrote two high-length Medium articles about our process and results.

### [Part 1](https://medium.com/@ChristophLabacher/feet-a-study-on-foot-based-interaction-part-1-c3f8e7b436ba):
- Historical application of foot-based interaction
- Possible contexts of use in a modern, digital space
- Research

### [Part 2](https://medium.com/@ChristophLabacher/feet-a-study-on-foot-based-interaction-part-2-8bc684a07a48):
- Defining the focus of our development
- Technology
- User-centered introduction
- Observations
- A look ahead
- Closing thoughts

## Structure

*Disclaimer: We didn't go into the actual LeapMotion-Library code. Since the LeapMotion is obviously optimised for tracking hands, tracking a foot is not working properly often times. Most times we stuck a cut-out hand to the foot: It looks a bit weird, but it works great!*

### Backend

The X- and Y-Position of the foot is saved every frame with some additional data in what is called a Moment. The last 250 Moments are being kept in an array.

A continous movement in one direction during several Moments is saved into a Movement, that includes a start- and endpostion and -time as well as a velocity.

If a certain pattern of Moments or Movements is recognized, a Gesture is created, that contains information about those Moments or Movements. An Gesture-Event is fired as well.

### Middleware

A selection interface is abstracted into an object, so it can be reused. There are various parameters to control the selection and its select or unselect callbacks. Using a soundmanager sound are being played on hover, select or unselect.

### Frontend

Multiple demos are included in various branches: more abstract ones, like a presentation of different visualisations for the position and movement of the foot, an visualisation in order to teach useres how to trigger a swipe and various examples of selections; but also an image gallery, that is controlled by swipes and includes a selection to favorite or delete images.

## Applications

![](/readme/macbook.gif)

We developed several applications to introduce the user to using his feet to controll a digital interface. They can be found in the various brachnes of the project.

## License

The MIT License (MIT)
Copyright (c) 2015 Nikolas Klein & Christoph Labacher

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
