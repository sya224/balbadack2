import logging
import boto3
from botocore.exceptions import ClientError

REGION = ''
ACCESS_KEY_ID = ''
SECRET_ACCESS_KEY = ''

def upload_file(file_name, bucket, object_name=None):
    # If S3 object_name was not specified, use file_name
    if object_name is None:
        object_name = 'hospital/'+file_name
    # Upload the file
    s3_resource = boto3.resource(
                    's3',
                    region_name=REGION,
                    aws_access_key_id=ACCESS_KEY_ID,
                    aws_secret_access_key=SECRET_ACCESS_KEY
                    )
    try:
      response = s3_resource.Bucket(bucket).put_object(Key = object_name, Body = open(file_name, 'rb'))
      s3_resource.ObjectAcl(bucket,object_name).put(ACL='public-read')

    except ClientError as e:
        logging.error(e)
        return False
    return True

