 using System.Collections.Generic;

 namespace WebApplicationBasic.Models
 {
     public class SavedImage
     {
         public int SavedImageId { get; set; }
         public string UserId { get; set; }
         public string Description { get; set; }
         public List<SavedImageTag> Tags { get; set; }
         public List<SavedImageFace> Faces { get; set; }
         public string StorageUrl { get; set; }
     }

     public class SavedImageTag
     {
         public int SavedImageTagId { get; set; }
         public int SavedImageId { get; set; }
         public string Tag { get; set; }
     }

     public class SavedImageFace
     {
        public int SavedImageFaceId {get; set; }

        public int SavedImageId { get; set; }
        
        public string Gender { get; set; }

        public int Age { get; set; }
     }
 }