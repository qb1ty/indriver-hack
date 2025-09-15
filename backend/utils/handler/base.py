
import os
import cv2

import torch
import torchvision
from torchvision import transforms
from torchvision.models.detection.faster_rcnn import FastRCNNPredictor, FasterRCNN
import numpy as np

from typing import Union

from PIL import Image

class BaseHandler:

    
    def __init__(self):
        BASE_DIR = os.path.dirname(os.path.abspath(__file__))

        self.model_path = os.path.abspath(os.path.join(BASE_DIR, "..", "models", "best.pth")) 


    def get_model(self, num_classes: int, weights_path: str = None, device: str = "cpu") -> FasterRCNN:

        model = torchvision.models.detection.fasterrcnn_resnet50_fpn(
            weights="FasterRCNN_ResNet50_FPN_Weights.COCO_V1"
        )


        in_feats = model.roi_heads.box_predictor.cls_score.in_features
        model.roi_heads.box_predictor = FastRCNNPredictor(in_feats, num_classes)

        if weights_path:
            state_dict = torch.load(weights_path, map_location=device)
            model.load_state_dict(state_dict)
        model.to(device).eval()

        return model


    def load_image(self, image: np.ndarray) -> Union[FasterRCNN, np.ndarray]:
        
        model = self.get_model(num_classes=7, weights_path=self.model_path, device="cpu")

        source = cv2.imdecode(image, cv2.IMREAD_COLOR)

        img_rgb = cv2.cvtColor(source, cv2.COLOR_RGB2BGR)

        transform = transforms.ToTensor()

        tensor_img = transform(img_rgb).unsqueeze(0)

        with torch.no_grad():
            outputs = model(tensor_img)
        
        return outputs, source

    