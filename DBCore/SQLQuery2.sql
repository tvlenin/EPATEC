/*
delete from %  
select * from % 
drop table %

alter table %
alter column %
*/
CREATE TABLE [dbo].[CUSTOMER] (
    [ID_Card]       INT           NOT NULL,
    [Name]          VARCHAR (20)  NULL,
    [Residence]     VARCHAR (200) NULL,
    [Nickname]      VARCHAR (100) NULL,
    [Pass]          VARCHAR (100) NULL,
    [BDate]         VARCHAR (10)  NULL,
    [Phone]         INT           NULL,
    [Email]         VARCHAR (100) NULL,
    [PriorityLevel] INT           NOT NULL,
    PRIMARY KEY CLUSTERED ([ID_Card] ASC)
);