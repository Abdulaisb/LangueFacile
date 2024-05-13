from google.cloud import translate_v2 as translate

# Initialize the translator
translator = translate.Client()

testVal = 'Je suis un chat noir'
# Translate the text
translated = translator.translate(testVal, target_language='en')

print(translated['translatedText'])
