using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace dotnetapp.Models
{
   public class ChatMessage{
    [Key]
    public int ChatId { get; set; }
    public int JobId {get;set;}
    public string SenderId {get;set;}
    public string RecipientId {get;set;}
    public string Sender  { get; set; }
    public string Recipient { get; set; }
    public string Message { get; set; }
    public DateTime Timestamp { get; set; }
}
}