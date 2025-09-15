
from typing import Union

import numpy as np
from PIL import Image
from .handler.draw_detection import DrawHandler



class CarArtifact:

    draw_class = DrawHandler()


    def detect_car(self, img: Image.Image) -> Union[np.ndarray, int]:
        
        
        data = np.frombuffer(img.read(), np.uint8)
        
        img, count = self.draw_class.draw_object(data)

        
        return img, count
    

