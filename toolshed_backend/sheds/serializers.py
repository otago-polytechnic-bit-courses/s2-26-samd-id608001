from rest_framework import serializers
from .models import Shed, Tool


class ShedSerializer(serializers.ModelSerializer):
    tool_count = serializers.SerializerMethodField()

    class Meta:
        model = Shed
        fields = ["id", "name", "suburb", "city", "tool_count"]
        

    def get_tool_count(self, obj):
        return obj.tools.count()

class ToolSerializer(serializers.ModelSerializer):

    class Meta:
        model = Tool
        fields = ["id", "name", "description"]

class ShedDetailSerializer(serializers.ModelSerializer):
    tools = ToolSerializer(many=True, read_only=True)

    class Meta:
        model = Shed
        fields = ["id", "name", "suburb", "city", "created_at", "tools"]


