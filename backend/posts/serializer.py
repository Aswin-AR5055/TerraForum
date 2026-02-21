from rest_framework import serializers

class CreatePostSerializer(serializers.Serializer):

    title = serializers.CharField(max_length=200)
    content = serializers.CharField()