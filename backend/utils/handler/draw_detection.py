
import cv2
import numpy as np
from django.core.files.base import ContentFile
from PIL import Image
from uuid import uuid4

from .base import BaseHandler

class DrawHandler(BaseHandler):

    def __init__(self):

        super().__init__()


    def draw_object(self, image: np.ndarray):

        count = 0
        outputs, img = self.load_image(image)


        for box, score, label in zip(outputs[0]["boxes"], outputs[0]["scores"], outputs[0]["labels"]):
            
            if score < 0.77:
                continue
            
            x1, y1, x2, y2 = box.int().tolist()

            cv2.rectangle(img, (x1, y1), (x2, y2), (0, 255, 0), 2)
            cv2.putText(img, f"{label}:{score:.2f}", (x1, y1-5),
                cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

            count += 1

        is_success, buffer = cv2.imencode(".jpg", img)
        if not is_success:
            raise ValueError("Не удалось закодировать изображение")
        
        image = ContentFile(buffer.tobytes(), name=f"{uuid4()}")

        return image, count




