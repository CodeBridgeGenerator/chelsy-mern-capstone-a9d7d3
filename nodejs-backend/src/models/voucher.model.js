
    module.exports = function (app) {
        const modelName = 'voucher';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            Id: { type:  String , minLength: null, maxLength: 150, index: true, trim: true },
CategoryId: { type:  String , required: true, maxLength: null },
Points: { type: Number, required: false, max: 10000000 },
Title: { type:  String , required: true },
Image: { type:  String , required: true },
Description: { type:  String , required: true },
TermsAndCondition: { type:  String , required: true },

            
            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true }
          },
          {
            timestamps: true
        });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };