from rest_framework import serializers

class CreateCommentSerializer(serializers.Serializer):
    post_id = serializers.CharField()
    content = serializers.CharField()