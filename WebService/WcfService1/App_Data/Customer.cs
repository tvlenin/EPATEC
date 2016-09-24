﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace WcfService1{
    [DataContract]
    public class Customer{
        [DataMember]
        public int ID_Card { get; set; }
        [DataMember]
        public string Name { get; set; }
        [DataMember]
        public string Residence { get; set; }
        [DataMember]
        public string Nickname { get; set; }
        [DataMember]
        public string Secure_Pass { get; set; }
        [DataMember]
        public string BDate { get; set; }
        [DataMember]
        public int Phone { get; set; }
        [DataMember]
        public string Email { get; set; }
        [DataMember]
        public int PriorityLevel { get; set; }
        [DataMember]
        public bool Active { get; set; }
    }
}