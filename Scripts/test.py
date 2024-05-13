import sys
import os
from google.cloud import translate_v2 as translate
sys.path.append('../private')
from hidden import lf_service_1

os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = lf_service_1

# Initialize the translator
translator = translate.Client()

testVal = 'Je suis un chat noir'
# Translate the text
translated = translator.translate(testVal, target_language='en')

print(translated)

